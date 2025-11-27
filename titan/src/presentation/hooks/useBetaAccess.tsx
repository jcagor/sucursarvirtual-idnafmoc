"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { EMPTY_USER, UserDataInterface } from "lib";
import { jwtDecode } from "jwt-decode";

export const useBetaAccess = (betaAccess: string[] | undefined) => {
  const [userData, setUserData] = useState<UserDataInterface>(EMPTY_USER);
  const [visible, setVisible] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.access_token) {
      setUserData(jwtDecode(session.access_token));
    }
  }, [session]);

  useEffect(() => {
    const { identification_number } = userData;
    if (betaAccess) {
      if (betaAccess.includes(identification_number)) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    } else {
      setVisible(true);
    }
  }, [betaAccess, userData]);

  return visible;
};

export function limpiarDireccionSAP(direccion: string): string {
  return (
    direccion
      // Elimina caracteres especiales (excepto letras, números y espacios)
      .replace(/[^a-zA-Z0-9\s]/g, "")
      // Reemplaza múltiples espacios por uno solo
      .replace(/\s+/g, " ")
      // Elimina espacios al inicio y al final
      .trim()
  );
}

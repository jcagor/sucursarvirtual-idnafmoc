import * as Yup from "yup";

export class SearchValidationSchema {
  private jobSearchFormValidations: Yup.AnyObject;

  constructor() {
    this.jobSearchFormValidations = Yup.object().shape({
      searchString: Yup.string().max(200).min(3),
    });
  }

  public getSearchFormValidation() {
    return this.jobSearchFormValidations;
  }
}

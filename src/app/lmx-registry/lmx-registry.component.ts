import { Component, OnInit } from '@angular/core';
type FormElement = HTMLInputElement | HTMLSelectElement | null;
function getElementByIdOrFail(id: string, formStep: Element): FormElement {
  const element: FormElement = formStep.querySelector(`#${id}`);
  if (!element) {
    throw new Error(`Element with id ${id} not found`);
  }
  return element;
}

@Component({
  selector: 'app-lmx-registry',
  templateUrl: './lmx-registry.component.html',
  styleUrls: ['./lmx-registry.component.css']
})
export class LMXRegistryComponent implements OnInit {
  private prevBtns!: NodeListOf<Element>;
  private nextBtns!: NodeListOf<Element>;
  private progress!: HTMLElement;
  private formSteps!: NodeListOf<Element>;
  private progressSteps!: NodeListOf<Element>;
  private progressActive!: NodeListOf<Element>;
  private form!: HTMLElement;



  private formStepsNum = 0;


  ngOnInit(): void {
    // Your component initialization logic here
    this.prevBtns = document.querySelectorAll(".btn-prev");
    this.nextBtns = document.querySelectorAll(".btn-next");
    this.progress = document.getElementById("progress")!;
    this.formSteps = document.querySelectorAll(".form-step");
    this.progressSteps = document.querySelectorAll(".progress-step");
    this.progressActive = document.querySelectorAll(".progress-step-active");
    this.form = document.getElementById('form')!;

    // Example: Add a click event listener to a button
    this.form.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('btn-prev')) {
        // Handle Previous button click
        this.handlePrevButtonClick();
      } else if (target.classList.contains('btn-next')) {
        // Handle Next button click
        this.handleNextButtonClick();
      }
    });
    const checkbox = document.getElementById('sameAsCompany') as HTMLInputElement;

    checkbox.addEventListener('change', () => {
      const city = this.formSteps[2].querySelector('#city2') as HTMLInputElement;
      const country = this.formSteps[2].querySelector('#country2') as HTMLInputElement;
      const postalcode = this.formSteps[2].querySelector('#postalcode2') as HTMLInputElement;
      const street = this.formSteps[2].querySelector('#street2') as HTMLInputElement;
      const building = this.formSteps[2].querySelector('#building2') as HTMLInputElement;

      if (checkbox.checked) {
        this.copyFields('#city, #country, #postalcode, #street, #building, #state', '#city2, #country2, #postalcode2, #street2, #building2, #state2');
        [city, country, postalcode, street, building].forEach(input => {
          input.dispatchEvent(new Event('input'));
        });
      } else {
        [city, country, postalcode, street, building].forEach(input => {
          input.value = '';
          this.setSuccess(input);
        });
      }
    });
  }



  private handlePrevButtonClick(): void {
    const currentFormStep = this.formSteps[this.formStepsNum];
    const errorInputs = currentFormStep.querySelectorAll('.error');


    errorInputs.forEach((input, index) => {
      if (index !== 0) {
        this.removeError(input);
      }
    });

    // Clear input values in the current form step except the first input group
    // const inputFields = currentFormStep.querySelectorAll('input, select');
    // inputFields.forEach((input, index) => {
    //   if (index !== 0) {
    //     const typedInput = input as HTMLInputElement | HTMLSelectElement;
    //     typedInput.value = '';
    //   }
    // });
    this.formStepsNum--;
    this.updateFormSteps();
    this.updateProgressbar();
  }

  private handleNextButtonClick(): void {
    const activeForm: Element | null = document.querySelector('.form');
    if (activeForm) {
      const inputGroups = activeForm.querySelectorAll('.input-group');

      const currentFormStepsNum = this.formStepsNum;
      this.validateInputs(currentFormStepsNum);

      const noInputGroupsWithErrors = Array.from(inputGroups).every(inputGroup =>
        !inputGroup.classList.contains('error')
      );

      if (noInputGroupsWithErrors && this.formStepsNum < 4) {
        this.formStepsNum++;
        this.updateFormSteps();
        this.updateProgressbar();
      } else if (noInputGroupsWithErrors && this.formStepsNum === 4) {
        this.saveFormDataAndSubmit(activeForm as HTMLElement);
      }
    }
  }

  private validateInputs(formStep: number): boolean {


    const currentFormStep = this.formSteps[formStep];

    try {
      if (formStep === 0) {
        const username = getElementByIdOrFail('username', currentFormStep)!;
        const registration = getElementByIdOrFail('registration', currentFormStep)!;
        const phone = getElementByIdOrFail('phone', currentFormStep)!;
        const email = getElementByIdOrFail('email', currentFormStep)!;
        const email2 = getElementByIdOrFail('email2', currentFormStep)!;
        let isValid = true;

        if (username && username.value.trim() === '') {
          this.setError(username, 'Username is required');
          isValid = false;
        } else {
          this.setSuccess(username);
        }

        if (registration && registration.value.trim() === '') {
          this.setError(registration, 'Registration number is required');
          isValid = false;
        } else {
          this.setSuccess(registration);
        }

        if (phone && phone.value.trim() === '') {
          this.setError(phone, 'Phone number is required');
          isValid = false;
        } else {
          this.setSuccess(phone);
        }

        const emailValue = email.value.trim();
        if (emailValue === '') {
          this.setError(email, 'Email is required');
          isValid = false;
        } else if (!this.isValidEmail(emailValue)) {
          this.setError(email, 'Provide a valid email address');
          isValid = false;
        } else {
          this.setSuccess(email);
        }

        const emailValue2 = email2.value.trim();
        if (emailValue2 === '') {
          this.setError(email2, 'Email is required');
          isValid = false;
        } else if (!this.isValidEmail(emailValue2)) {
          this.setError(email2, 'Provide a valid email address');
          isValid = false;
        } else {
          this.setSuccess(email2);
        }

        return isValid;
      }
      else if (formStep === 1) {
        const city = getElementByIdOrFail('city', currentFormStep)!;
        const country = getElementByIdOrFail('country', currentFormStep)!;
        const postalcode = getElementByIdOrFail('postalcode', currentFormStep)!;
        const street = getElementByIdOrFail('street', currentFormStep)!;
        const building = getElementByIdOrFail('building', currentFormStep)!;
        let isValid = true;
        if (postalcode.value.trim() === '') {
          this.setError(postalcode, 'Postal code is required');
          isValid = false;
        } else {
          this.setSuccess(postalcode);
        }
        if (country.value.trim() === 'Select a country' ||country.value.trim() === '' ) {
          this.setError(country, 'Country is required');
          isValid = false;
        } else {
          this.setSuccess(country);
        }
        if (city.value.trim() === '') {
          this.setError(city, 'City is required');
          isValid = false;
        } else {
          this.setSuccess(city);
        }
        if (street.value.trim() === '') {
          this.setError(street, 'Street is required');
          isValid = false;
        } else {
          this.setSuccess(street);
        }
        if (building.value.trim() === '') {
          this.setError(building, 'Building is required');
          isValid = false;
        } else {
          this.setSuccess(building);
        }

        return isValid;
      }
      else if (formStep === 2) {
        const city = getElementByIdOrFail('city2', currentFormStep)!;
        const country = getElementByIdOrFail('country2', currentFormStep)!;
        const postalcode = getElementByIdOrFail('postalcode2', currentFormStep)!;
        const street = getElementByIdOrFail('street2', currentFormStep)!;
        const building = getElementByIdOrFail('building2', currentFormStep)!;

        let isValid = true;

        if (postalcode.value.trim() === '') {
          this.setError(postalcode, 'Postal code is required');
          isValid = false;
        } else {
          this.setSuccess(postalcode);
        }

        if (country.value.trim() === 'Select a country' || country.value.trim() === '' ) {
          this.setError(country, 'Country is required');
          isValid = false;
        } else {
          this.setSuccess(country);
        }

        if (city.value.trim() === '') {
          this.setError(city, 'City is required');
          isValid = false;
        } else {
          this.setSuccess(city);
        }

        if (street.value.trim() === '') {
          this.setError(street, 'Street is required');
          isValid = false;
        } else {
          this.setSuccess(street);
        }

        if (building.value.trim() === '') {
          this.setError(building, 'Building is required');
          isValid = false;
        } else {
          this.setSuccess(building);
        }

        return isValid;
      }

      else if (formStep === 3) {
        const firstname = getElementByIdOrFail('firstname', currentFormStep)!;
        const lastname = getElementByIdOrFail('lastname', currentFormStep)!;
        const phone2 = getElementByIdOrFail('phone2', currentFormStep)!;
        const email3 = getElementByIdOrFail('email3', currentFormStep)!;

        let isValid = true;

        if (firstname.value.trim() === '') {
          this.setError(firstname, 'First name is required');
          isValid = false;
        } else {
          this.setSuccess(firstname);
        }

        if (lastname.value.trim() === '') {
          this.setError(lastname, 'Last name is required');
          isValid = false;
        } else {
          this.setSuccess(lastname);
        }

        if (phone2.value.trim() === '') {
          this.setError(phone2, 'Phone number is required');
          isValid = false;
        } else {
          this.setSuccess(phone2);
        }

        const emailValue3 = email3.value.trim();
        if (emailValue3 === '') {
          this.setError(email3, 'Email is required');
          isValid = false;
        } else if (!this.isValidEmail(emailValue3)) {
          this.setError(email3, 'Provide a valid email address');
          isValid = false;
        } else {
          this.setSuccess(email3);
        }

        return isValid;
      }
      else if (formStep === 4) {
        const bankname = getElementByIdOrFail('bankname', currentFormStep)!;
        const accountname = getElementByIdOrFail('accountname', currentFormStep)!;
        const accounttype = getElementByIdOrFail('accounttype', currentFormStep)!;
        const accountnumber = getElementByIdOrFail('accountnumber', currentFormStep)!;
        const branch = getElementByIdOrFail('branch', currentFormStep)!;
        const swiftcode = getElementByIdOrFail('swiftcode', currentFormStep)!;

        let isValid = true;

        if (bankname.value.trim() === '') {
          this.setError(bankname, 'Username is required');
          isValid = false;
        } else {
          this.setSuccess(bankname);
        }

        if (accountname.value.trim() === '') {
          this.setError(accountname, 'Account name is required');
          isValid = false;
        } else {
          this.setSuccess(accountname);
        }

        if (accounttype.value.trim() === 'Select Account Type') {
          this.setError(accounttype, 'Account type is required');
          isValid = false;
        } else {
          this.setSuccess(accounttype);
        }

        if (accountnumber.value.trim() === '') {
          this.setError(accountnumber, 'Account number is required');
          isValid = false;
        } else {
          this.setSuccess(accountnumber);
        }

        if (branch.value.trim() === '') {
          this.setError(branch, 'Branch is required');
          isValid = false;
        } else {
          this.setSuccess(branch);
        }

        if (swiftcode.value.trim() === '') {
          this.setError(swiftcode, 'Swiftcode is required');
          isValid = false;
        } else {
          this.setSuccess(swiftcode);
        }

        return isValid;
      }




      return true; // Validation passed
    } catch (error) {
      console.error(error);
      return false; // Validation failed due to missing element
    }
  }

  private updateFormSteps(): void {
    this.formSteps.forEach((formStep) => {
      formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });

    this.formSteps[this.formStepsNum].classList.add("form-step-active");
  }

  private updateProgressbar(): void {
    this.progressSteps.forEach((progressStep, idx) => {
      if (idx < this.formStepsNum + 1) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });
    const progressActive = Array.from(this.progressSteps).filter(step =>
      step.classList.contains("progress-step-active")
    );

    const progressWidth = ((progressActive.length - 1) / (this.progressSteps.length - 1)) * 100 + "%";

    if (this.progress) {
      this.progress.style.width = progressWidth;
    }

  }

  private copyFields(sourceSelector: string, targetSelector: string): void {
    const sourceInputs = document.querySelectorAll(sourceSelector);
    const targetInputs = document.querySelectorAll(targetSelector);

    if (sourceInputs.length !== targetInputs.length) {
      console.error("Number of source and target inputs doesn't match.");
      return;
    }

    sourceInputs.forEach((sourceInput, index) => {
      (targetInputs[index] as HTMLInputElement).value = (sourceInput as HTMLInputElement).value;
    });
  }

  private saveFormDataAndSubmit(form: HTMLElement): void {
    const inputGroups = form.querySelectorAll('.input-group');
    const formData: { [key: string]: string } = {};
  
    inputGroups.forEach((inputGroup: Element) => {
      const label = inputGroup.querySelector('label');
      const input = inputGroup.querySelector('input, select') as HTMLInputElement | HTMLSelectElement | null;
  
      if (input) {
        const fieldName = label?.getAttribute('for');
  
        if (fieldName) {
          formData[fieldName] = input.value;
        }
      }
    });
  
    const formDataString = Object.entries(formData)
      .map(([fieldName, value]) => `${fieldName}: ${value}`)
      .join('\n');
  
    const blob = new Blob([formDataString], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'form_data.txt';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
  
    downloadLink.click();
  
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  
    if (form instanceof HTMLFormElement) {
      form.submit();
      alert('Your Registration has been completed! Thank You!');
    }
  }
  


  private setError(element: Element, message: string): void {
    const inputControl = element.parentElement as HTMLElement;
    const errorDisplay = inputControl.querySelector('.error') as HTMLElement;

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  }

  private setSuccess(element: Element): void {
    const inputControl = element.parentElement as HTMLElement;
    const errorDisplay = inputControl.querySelector('.error') as HTMLElement;

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  }

  private isValidEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  private removeError(element: Element): void {
    const inputControl = element.parentElement as HTMLElement;
    const errorDisplay = inputControl.querySelector('.error') as HTMLElement;

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
  }
}

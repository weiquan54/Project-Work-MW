import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lmx-calculator',
  templateUrl: './lmx-calculator.component.html',
  styleUrls: ['./lmx-calculator.component.css']
})
export class LMXCalculatorComponent implements OnInit {
  priceInput!: HTMLInputElement ;
  rangeInput!: HTMLInputElement;
  impressionvalue!: HTMLInputElement;
  impressionrange!: HTMLInputElement;
  valueContainer!: HTMLElement;


  startTimeInput!: HTMLInputElement;
  endTimeInput!: HTMLInputElement;
  videoDurationInput!: HTMLInputElement;
  dayDurationInput!: HTMLInputElement;

  totalTimeResult!: HTMLElement;
  videoDurationResult!: HTMLElement;
  spotPerHourResult!: HTMLElement;
  spotPerDayResult!: HTMLElement;
  spotTotalResult!: HTMLElement;



  
  ngOnInit(): void {
    this.priceInput = document.getElementById('priceInput') as HTMLInputElement;
    this.rangeInput = document.getElementById('rangeInput') as HTMLInputElement;
    this.impressionvalue = document.getElementById('impressionvalue') as HTMLInputElement;
    this.impressionrange = document.getElementById('impressionrange') as HTMLInputElement;
    this.valueContainer = document.querySelector('.value-container') as HTMLElement;
   
    this.updateValueContainer();
    this.startTimeInput = document.getElementById('start-time') as HTMLInputElement;
    this.endTimeInput = document.getElementById('end-time') as HTMLInputElement;
    this.videoDurationInput = document.getElementById('video-duration') as HTMLInputElement;
    this.dayDurationInput = document.getElementById('day-duration') as HTMLInputElement;

    this.totalTimeResult = document.getElementById('total-time') as HTMLElement;
    this.videoDurationResult = document.getElementById('video-duration-result') as HTMLElement;
    this.spotPerHourResult = document.getElementById('spot-per-hour') as HTMLElement;
    this.spotPerDayResult = document.getElementById('spot-per-day') as HTMLElement;
    this.spotTotalResult = document.getElementById('spot-total') as HTMLElement;
    this.addEventListeners();
    // this.addEventListeners();
    this.updateResults();
  }

  addEventListeners(): void {
    this.priceInput.addEventListener('input', () => {
      const enteredValue = parseFloat(this.priceInput.value);
      if (enteredValue > 10000) {
        this.priceInput.value = '10000';
      }
      this.updateRangeInput();
      this.updateValueContainer();
    });

    this.rangeInput.addEventListener('input', () => {
      this.updateValueInput(this.rangeInput, this.priceInput);
      this.updateValueContainer();
    });

    this.impressionvalue.addEventListener('input', () => {
      const enteredValue = parseFloat(this.impressionvalue.value);
      if (enteredValue > 100000000) {
        this.impressionvalue.value = '100000000';
      }
      this.updateValueInput(this.impressionvalue, this.impressionrange);
      this.updateValueContainer();
    });

    this.impressionrange.addEventListener('input', () => {
      this.updateValueInput(this.impressionrange, this.impressionvalue);
      this.updateValueContainer();
    });

    this.startTimeInput.addEventListener('input', () => this.updateResults());
    this.endTimeInput.addEventListener('input', () => this.updateResults());
    this.videoDurationInput.addEventListener('input', () => this.updateResults());
    this.dayDurationInput.addEventListener('input', () => this.updateResults());
  }

  updateRangeInput(): void {
    this.rangeInput.value = this.priceInput.value;
  }

  updateValueInput(rangeInput: HTMLInputElement, valueInput: HTMLInputElement): void {
    valueInput.value = rangeInput.value;
  }

  updateValueContainer(): void {
    const price = parseFloat(this.priceInput.value) || 0;
    const impression = parseFloat(this.impressionvalue.value) || 0;
    if (impression !== 0) {
      const value = (price / impression) * 1000;
      this.valueContainer.textContent = this.numberWithCommas(value.toFixed(2));
      this.valueContainer.style.color = value === 0 ? 'black' : '';
    } else {
      this.valueContainer.textContent = '0';
      this.valueContainer.style.color = 'black';
    }
  }

  numberWithCommas(x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }



  updateResults(): void {
    const startTime:any = new Date(`1970-01-01T${this.startTimeInput.value}`)!;
    let endTime:any = new Date(`1970-01-01T${this.endTimeInput.value}`)!;
    const videoDuration = this.videoDurationInput.value === '' ? 15 : parseInt(this.videoDurationInput.value, 10);
    const dayDuration = this.dayDurationInput.value === '' ? 1 : parseInt(this.dayDurationInput.value, 10);

    if (endTime < startTime) {
      endTime = new Date(`1970-01-02T${this.endTimeInput.value}`);
    }
    const totalTimeMilliseconds = endTime - startTime;

    const totalHours = Math.floor(totalTimeMilliseconds / 3600000);
    const totalMinutes = Math.floor((totalTimeMilliseconds % 3600000) / 60000);

    const spotPerHour = Math.floor((3600 / videoDuration));
    const spotPerDay = Math.floor((totalTimeMilliseconds / (videoDuration * 1000)));
    const spotTotal = Math.floor((spotPerDay * dayDuration));

    this.totalTimeResult.textContent = isNaN(totalHours) ? "0 hours 0 minutes" : `${totalHours} hours ${totalMinutes} minutes`;
    this.videoDurationResult.textContent = isNaN(videoDuration) ? "0 seconds" : `${videoDuration} seconds`;
    this.spotPerHourResult.textContent = isNaN(spotPerHour) ? "0" : spotPerHour.toString();
    this.spotPerDayResult.textContent = isNaN(spotPerDay) ? "0" : spotPerDay.toString();
    this.spotTotalResult.textContent = isNaN(spotTotal) ? "0" : spotTotal.toString();
  }
}

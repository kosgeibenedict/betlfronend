import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inteliport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inteliport.component.html',
  styleUrls: []
})
export class InteliportComponent {
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  showForm = false;

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.submitSuccess = false;
      this.submitError = false;
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        this.submitSuccess = true;
        form.reset();
      } else {
        this.submitError = true;
      }
    } catch (error) {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
      
      if (this.submitSuccess) {
        setTimeout(() => {
          this.submitSuccess = false;
          this.showForm = false;
        }, 3000);
      }
    }
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ContentBlock {
  id?: number;
  blockKey: string;
  content: string;
  type: string;
}

@Component({
  selector: 'app-cms-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cms-admin.component.html'
})
export class CmsAdminComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private apiUrl = 'http://localhost:8081/api/cms';

  contentBlocks: ContentBlock[] = [];
  editForm: FormGroup;
  selectedBlock: ContentBlock | null = null;
  
  // Media upload state
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;

  constructor() {
    this.editForm = this.fb.group({
      blockKey: ['', Validators.required],
      content: ['', Validators.required],
      type: ['TEXT']
    });
  }

  ngOnInit() {
    this.loadContentBlocks();
  }

  loadContentBlocks() {
    this.http.get<ContentBlock[]>(`${this.apiUrl}/content`).subscribe(data => {
      this.contentBlocks = data;
    });
  }

  editBlock(block: ContentBlock) {
    this.selectedBlock = block;
    this.editForm.patchValue({
      blockKey: block.blockKey,
      content: block.content,
      type: block.type
    });
    this.uploadedImageUrl = null;
  }

  createNewBlock() {
    this.selectedBlock = null;
    this.editForm.reset({ type: 'TEXT' });
    this.uploadedImageUrl = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadMedia() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<{url: string}>(`${this.apiUrl}/upload`, formData).subscribe({
      next: (response) => {
        this.uploadedImageUrl = response.url;
        this.editForm.patchValue({ content: response.url, type: 'IMAGE' });
        alert('Media uploaded successfully!');
      },
      error: (err) => {
        alert('Upload failed: ' + err.message);
      }
    });
  }

  saveContent() {
    if (this.editForm.valid) {
      const payload: ContentBlock = this.editForm.value;
      this.http.post<ContentBlock>(`${this.apiUrl}/content`, payload).subscribe({
        next: () => {
          alert('Content saved successfully!');
          this.loadContentBlocks();
          this.createNewBlock();
        },
        error: (err) => {
          alert('Failed to save content: ' + err.message);
        }
      });
    }
  }
}

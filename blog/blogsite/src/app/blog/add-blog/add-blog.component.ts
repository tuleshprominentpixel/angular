import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  author: string;
  languagesDropdown = [];
  languageDropdownSettings = {};
  public descriptionEditor = ClassicEditor;
  @ViewChild('addBlogForm') addBlogForm: NgForm;

  constructor(private router: Router,
    private blogService: BlogService, private auth: AuthService) { }

  ngOnInit(): void {
    this.languagesDropdown = this.blogService.getLanguages();
    this.languageDropdownSettings = this.blogService.dropdownSettingsfunction();
    this.author = (this.auth.loginUserNameOrEmail);
  }

  onNewBlogSubmit() {
    if (!this.addBlogForm.valid) {
      alert("invalid credentials!!");
      return false;
    }
    this.blogService.addBlog({
      ...this.addBlogForm.value,
      description: this.addBlogForm.value.description,
      id: this.blogService.getLatestIndexOfBlog(),
      date: new Date(),
      publishBy: this.author,
    });
    this.router.navigate(['blog']);
  }
}

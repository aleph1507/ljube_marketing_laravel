@extends('layouts.master')

@section('title', '| Create New Post')

@section('content')

<div class="content">
  <div class="row heading">
    <h2>Create New post</h2>
  </div>

  <div class="post">
    <form action="#">
      <div class="form-group row">
        <div class="lg-1 md-1 sm-10 xsm-10">
          <label for="title">Post title</label>
        </div>
        <div class="lg-3 md-3 sm-10 xsm-10">
          <input type="text" name='title'>
        </div>
        <div class="lg-offset-1 md-offset-1 lg-1 md-1 sm-10 xsm-10">
          <label for="image">Image</label>
        </div>
        <div class="lg-1 md-1 sm-10 xsm-10">
          <input type="file" name="image">
        </div>
      </div>
      <div class="form-group row">
        <div class="lg-1 md-1 sm-10 xsm-10">
          <label for="slug">Slug</label>
        </div>
        <div class="lg-3 md-3 sm-10 xsm-10">
          <input type="text" name="slug">
        </div>
        <div class="lg-offset-1 md-offset-1 lg-1 md-1 sm-10 xsm-10">
          <label for="category">Category</label>
        </div>
        <div class="lg-1 md-1 sm-10 xsm-10">
          <select name="category">
            <option value="">c1</option>
            <option value="">c2</option>
            <option value="">c3</option>
          </select>
        </div>
      </div>
      <div class="postbody row">
        <div class="form-group lg-10 md-10 sm-10 xsm-10">
          <label for="postbody">Post body</label>
          <textarea name="postbody" class="tinymce" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="tags row">
        <div class="form-group lg-10 md-10 sm-10 xsm-10">
          <label for="tags">Tags:</label><br>
          <select class="select2-multiple" name="tags[]" multiple="multiple">
            <option value="">business</option>
            <option value="">marketing</option>
            <option value="">promo</option>
          </select>
        </div>
      </div>
    </form>
  </div>

  <hr>
  <div class="categories">
    <div class="lg-3 md-3 sm-10 xsm-10">
      <h3 style="font-size:1.7em;font-style:normal;">Category management</h3>
    </div>
    <div class="lg-4 md-4 sm-10 xsm-10">
      <form action="#">
        <label for="new_category">Add category</label>
        <input type="text" name="new_category">
        <input type="submit" value="Add">
      </form>
    </div>

    <div class="lg-3 md-3 sm-10 xsm-10">
      <form action="#">
        <label for="select_category">Select category</label>
        <select name="select_category">
          <option value="">c1</option>
          <option value="">c2</option>
          <option value="">c3</option>
        </select>
        <input type="submit" value="Delete">
      </form>
    </div>
  </div>
  <hr style="margin-top:3em;">
</div>

<script>
  jQuery('.select2-multiple').select2({ width: '100%' });
</script>
<div class="spacing" style="height:200px;"></div>
@endsection

<% include base/user_header %>
<div class="user-mid-content">
  <div class="mid-content-item">
    <div class="mid-content-item-header clearfix">
      <h2 class="float-left">Export supplier data</h2>
      <div class="create-page-item-link float-right">
        <a href="/supplier">Go Back </a>
      </div>
    </div>
    <div class="page-form">
      <form action="/supplier/export" method="POST">
        <div>
          <p><lable>Select file format:</label></p>
          <p>
            <select name="fileFormat">
              <option>---Choose file format---</option>
              <option>CSV</option>
              <option>Excel</option>
              <option>PDF</option>
            </select>
          </p>
        </div>
        <div>
          <input name="submit" type="submit" value="Export file"/>
        </div>
      </form>
    </div>
  </div>
</div>
<% include base/user_footer %>

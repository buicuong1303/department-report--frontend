// function to act as a class
import './ActionDataSheetRenderer.css'

function ActionDataSheetRenderer () {}

ActionDataSheetRenderer.prototype.init = function(params) {
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.setAttribute('style', 'height: 100%');
  this.eGui.innerHTML = '';

  // check condition anh disabled button
  if (params.colDef.canCreateCopy) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-create-copy"><i class="create-copy fa fa-files-o" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-create-copy" disabled><i class="create-copy fa fa-files-o" aria-hidden="true"></i></button></span>';
  
  if ((params.colDef.canEdit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canEditAnyDataSheet) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-update"><i class="update fa fa-pencil" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-update" disabled><i class="update fa fa-pencil" aria-hidden="true"></i></button></span>';
  
  if (params.colDef.canView) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-view"><i class="view fa fa-eye" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-view" disabled><i class="view fa fa-eye" aria-hidden="true"></i></button></span>';
  
  if ((params.colDef.canSubmit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canSubmitAnyDataSheet) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-submit"><i class="submit fa fa-check-circle-o" aria-hidden="true"></i></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-submit" disabled><i class="submit fa fa-check-circle-o" aria-hidden="true"></i></i></button></span>';
  
  if ((params.colDef.canDelete && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canDeleteAnyDataSheet) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-delete"><i class="delete fa fa-trash" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-delete" disabled><i class="delete fa fa-trash" aria-hidden="true"></i></button></span>';

  // get references to the elements we want
  if (params.colDef.canCreateCopy) this.btnCreateCopy = this.eGui.querySelector('.btn-create-copy');
  if ((params.colDef.canEdit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canEditAnyDataSheet) this.btnUpdate = this.eGui.querySelector('.btn-update');
  if (params.colDef.canView) this.btnView = this.eGui.querySelector('.btn-view');
  if ((params.colDef.canSubmit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canSubmitAnyDataSheet) this.btnSubmit = this.eGui.querySelector('.btn-submit');
  if ((params.colDef.canDelete && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canDeleteAnyDataSheet) this.btnDelete = this.eGui.querySelector('.btn-delete');

  // set value into cell
  if (params.colDef.canCreateCopy) this.btnCreateCopy.value = params.valueFormatted ? params.valueFormatted : params.value;
  if ((params.colDef.canEdit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canEditAnyDataSheet) this.btnUpdate.value = params.valueFormatted ? params.valueFormatted : params.value;
  if (params.colDef.canView) this.btnView.value = params.valueFormatted ? params.valueFormatted : params.value;
  if ((params.colDef.canSubmit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canSubmitAnyDataSheet) this.btnSubmit.value = params.valueFormatted ? params.valueFormatted : params.value;
  if ((params.colDef.canDelete && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canDeleteAnyDataSheet) this.btnDelete.value = params.valueFormatted ? params.valueFormatted : params.value;

  // add event listener to button
  if (params.colDef.canCreateCopy) this.btnCreateCopy.addEventListener('click', function(event){ params.colDef.createCopyDataSheet(event, this.value, params.data.fullName); });
  if ((params.colDef.canEdit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canEditAnyDataSheet) this.btnUpdate.addEventListener('click', function(event){ params.colDef.updateDataSheet(event, this.value, params.data.fullName); });
  if (params.colDef.canView) this.btnView.addEventListener('click', function(event){ params.colDef.viewDataSheet(event, this.value, params.data.fullName); });
  if ((params.colDef.canSubmit && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canSubmitAnyDataSheet) this.btnSubmit.addEventListener('click', function(event){ params.colDef.submitDataSheet(event, this.value, params.data.fullName); });
  if ((params.colDef.canDelete && (params.data.creationUserId === params.colDef.creationUserId)) || params.colDef.canDeleteAnyDataSheet) this.btnDelete.addEventListener('click', function(event){ params.colDef.deleteDataSheet(event, this.value, params.data.fullName); });
};

// gets called once (assuming destroy hasn't been called first) when grid ready to insert the element
ActionDataSheetRenderer.prototype.getGui = function() {
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
ActionDataSheetRenderer.prototype.refresh = function(params) {
  // set value into cell again
  this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;
  // return true to tell the grid we refreshed successfully
  return true;
};

// gets called when the cell is removed from the grid
ActionDataSheetRenderer.prototype.destroy = function() {
  // do cleanup, remove event listener from button
  if (this.eButton) {
    // check that the button element exists as destroy() can be called before getGui()
    this.eButton.removeEventListener('click', this.eventListener);
  }
};

export default ActionDataSheetRenderer;

// function to act as a class
import './ActionSalesLogRenderer.css'

function ActionSalesLogRenderer () {}

ActionSalesLogRenderer.prototype.init = function(params) {
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.setAttribute('style', 'height: 100%');
  this.eGui.innerHTML = '';

  // check condition anh disabled button
  if (params.colDef.canDuplicate) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-duplicate"><i class="duplicate fa fa-files-o" aria-hidden="true"></i></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-duplicate" disabled><i class="duplicate fa fa-files-o" aria-hidden="true"></i></i></button></span>';
  
  if (params.colDef.canEdit) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-update"><i class="update fa fa-pencil" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-update" disabled><i class="update fa fa-pencil" aria-hidden="true"></i></button></span>';
  
  if (params.colDef.canView) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-view"><i class="view fa fa-eye" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-view" disabled><i class="view fa fa-eye" aria-hidden="true"></i></button></span>';
  
  if (params.colDef.canDownload) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-download"><i class="download fa fa-download" aria-hidden="true"></i></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-download" disabled><i class="download fa fa-download" aria-hidden="true"></i></i></button></span>';
  
  if (params.colDef.canRefresh) this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-refresh"><i class="refresh fa fa-refresh" aria-hidden="true"></i></button></span>';
  else this.eGui.innerHTML += '<span class="my-css-class"><button class="btn-action btn-refresh" disabled><i class="refresh fa fa-refresh" aria-hidden="true"></i></button></span>';
 
  // get references to the elements we want
  if (params.colDef.canDuplicate) this.btnDuplicate = this.eGui.querySelector('.btn-duplicate');
  if (params.colDef.canEdit) this.btnUpdate = this.eGui.querySelector('.btn-update');
  if (params.colDef.canView) this.btnView = this.eGui.querySelector('.btn-view');
  if (params.colDef.canDownload) this.btnDownload = this.eGui.querySelector('.btn-download');
  if (params.colDef.canRefresh) this.btnRefresh = this.eGui.querySelector('.btn-refresh');

  // set value into cell
  if (params.colDef.canDuplicate) this.btnDuplicate.value = params.valueFormatted ? params.valueFormatted : params.value;
  if (params.colDef.canEdit) this.btnUpdate.value = params.valueFormatted ? params.valueFormatted : params.value;
  if (params.colDef.canView) this.btnView.value = params.valueFormatted ? params.valueFormatted : params.value;
  if (params.colDef.canDownload) this.btnDownload.value = params.valueFormatted ? params.valueFormatted : params.value;
  if (params.colDef.canRefresh) this.btnRefresh.value = params.valueFormatted ? params.valueFormatted : params.value;

  // add event listener to button
  if (params.colDef.canDuplicate) this.btnDuplicate.addEventListener('click', function(event){ params.colDef.duplicateSalesLog(event, this.value, params.data.fullName); });
  if (params.colDef.canEdit) this.btnUpdate.addEventListener('click', async function(event){ await params.colDef.updateSalesLog(event, this.value); });
  if (params.colDef.canView) this.btnView.addEventListener('click', function(event){ params.colDef.viewSalesLog(event, this.value); });
  if (params.colDef.canDownload) this.btnDownload.addEventListener('click', function(event){ params.colDef.downloadSalesLog(event, this.value, params.data.fullName); });
  if (params.colDef.canRefresh) this.btnRefresh.addEventListener('click', function(event){ params.colDef.refreshSalesLog(event, this.value, params.data.fullName); });
};

// gets called once (assuming destroy hasn't been called first) when grid ready to insert the element
ActionSalesLogRenderer.prototype.getGui = function() {
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
ActionSalesLogRenderer.prototype.refresh = function(params) {
  // set value into cell again
  this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;
  // return true to tell the grid we refreshed successfully
  return true;
};

// gets called when the cell is removed from the grid
ActionSalesLogRenderer.prototype.destroy = function() {
  // do cleanup, remove event listener from button
  if (this.eButton) {
    // check that the button element exists as destroy() can be called before getGui()
    this.eButton.removeEventListener('click', this.eventListener);
  }
};

export default ActionSalesLogRenderer;

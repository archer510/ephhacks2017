function myFunction() {
    var sheet_input = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1KZeDmzEeN42n1HRcP06tSQoxMjXXw8OgvYLYnupgUyY/edit#gid=0");
    var range = sheet_input.getRange('A1:A199');
    var img_url_values = range.getValues();
  
    //var sheet_unixes = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1KZeDmzEeN42n1HRcP06tSQoxMjXXw8OgvYLYnupgUyY/edit#gid=2065619872");
    var unix_sheet = SpreadsheetApp.setActiveSheet(sheet_input.getSheets()[1])
	var unixes = unix_sheet.getRange('A1:A3');
    var unix_array = unixes.getDisplayValues()
  
	// open sheet to hold results
	var sheet_results = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1KZeDmzEeN42n1HRcP06tSQoxMjXXw8OgvYLYnupgUyY/edit#gid=2065619872");
  
    // make array of form responses
    var form_response_sheets = [];
  
    for (i = 0; i < 3; i++) { 
    
	// Create a new form, then add a picture and short answer question
	var form = FormApp.create('EphVision Image Captioning');
	var img = UrlFetchApp.fetch('https://s-media-cache-ak0.pinimg.com/736x/94/da/1f/94da1ffff8230c0e8cce0f2c46f214ed.jpg');
	form.addImageItem()
	    .setTitle('Example Caption: White church with leafless trees in foreground. This is a picture of First Congregational Church in Williamstown, MA.')
	    .setHelpText('')
	    .setImage(img);
	for (j=0; j < 4; j++) {
	    var img = UrlFetchApp.fetch(img_url_values[4*i+j][0]);
	    form.addImageItem()
		.setTitle('Image ' + j)
		.setHelpText('')
		.setImage(img);
	    form.addParagraphTextItem()
		.setTitle('Describe the content of this image in 1-2 sentences.');
	}
    
	// Update the form's response destination.
	var dest_id = sheet_results.getId();
	form.setDestination(FormApp.DestinationType.SPREADSHEET, dest_id);
	// add form destination to list
	form_response_sheets.push(dest_id);   
	// Send form to recipient
	var url = form.getPublishedUrl();
	var response = UrlFetchApp.fetch(url);
	var htmlBody = HtmlService.createHtmlOutput(response).getContent();
	var email = unix_array[i][0] + "@williams.edu";
	MailApp.sendEmail({
		to: email,
		    subject: "EphVision Image Captioning",
		    htmlBody: "Please provide descriptions of the 4 images in this form to help make the Williams website accessible to blind and visually impaired people\n\n" + url,
		    });
	Logger.log('Published URL: ' + form.getPublishedUrl());
	Logger.log('Editor URL: ' + form.getEditUrl());
    }
    
    // Aggregate image data, in original sheet_input sheet, in column B
  
    var values = [];
  
    for (var i = 0; i < form_response_sheets.length; i++) {
	values.push(SpreadsheetApp.openById(form_response_sheets[i]).getRange('B2').getDisplayValue());
	SpreadsheetApp.openById(form_response_sheets[i]).getRange('B2')
	    .copyTo(sheet_input.getRange('B' + (i+1)));
    }
}

function onEdit(e){
    // Set a comment on the edited cell to indicate when it was changed.
    var range = e.range;
  
    for (var i = 0; i < form_response_sheets.length; i++) {
	values.push(SpreadsheetApp.openById(form_response_sheets[i]).getRange('B2').getDisplayValue());
	SpreadsheetApp.openById(form_response_sheets[i]).getRange('B2')
	    .copyTo(sheet_input.getRange('B' + (i+1)));
    }

}

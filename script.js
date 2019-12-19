(function() {
	  for (var tags = ['div', 'figure', 'figcaption'], i = 0; i < tags.length; i++) {
	    document.createElement(tags[i]);
	  }
	})();

	(function() {
	  //filter IE8 and earlier which don't support the generated content
	  if (typeof(window.getComputedStyle) == 'undefined') {
	    return;
	  }

	  //get the collection of PRE elements
	  var pre = document.getElementsByTagName('pre');
    //now iterate through the collection
	  for (var len = pre.length, i = 0; i < len; i++) {
	    //get the CODE or SAMP element inside it, 
	    //or just in case there isn't one, continue to the next PRE
	    var code = pre[i].getElementsByTagName('code').item(0);
	    if (!code) {
	      code = pre[i].getElementsByTagName('samp').item(0);
	      if (!code) {
	        continue;
	      }
	    }

	    //create a containing DIV column (but don't append it yet)
	    //including aria-hidden so that ATs don't read the numbers
	    var column = document.createElement('div');
	    column.setAttribute('aria-hidden', 'true');
      column.setAttribute('class', 'numbers');

	    //split the code by line-breaks to count the number of lines
	    //then for each line, add an empty span inside the column
	    for (var n = 0; n < code.innerHTML.split(/[\n\r]/g).length; n++) {
	      column.appendChild(document.createElement('span'));
	    }

	    //now append the populated column before the code element
	    pre[i].insertBefore(column, code);

	    //finally add an identifying class to the PRE to trigger the extra CSS
	    pre[i].className = 'line-numbers';
	  }

	})();


// converter
$('#convert').click(function() {
	//hide previous results - if shown
  $('.spit').hide(); 
	$('.confirm').hide();
	

	let input = $('input').val();
	let newText = (input.replace(/ /g, '-'));
	$('.spit').css('border-top','solid 4px #0F4C81');

    // show result div
		$('.spit').show(); 
		
	$('.spit').html('<span class="result" id="myResult" >'+ newText +'</span>');
	$('.spit').append('<br><button class="copy" onclick="copyFunc()" style="margin-top:20px;">copy value</button><div class="confirm"></div>');
});

// show 'value copied' div when copy button is clicked
copyFunc = () => {
	copyToClipboard('#myResult')
	$('.confirm').html('<strong style="color:#fff;font-weight:bolder;">Copied!</strong> ').show();
};

// copy to clipboard
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
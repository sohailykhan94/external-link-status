var anchorTags = [];

$('a').each(function() {
	var href = $(this).attr('href');
	if (typeof href !== 'undefined' && href.indexOf('#') === -1 && href.indexOf(window.location.host) === -1 && href.charAt(0) !== '/') {
		anchorTags.push($(this)[0]);
	}
});

function removeDuplicates(originalArray, objKey) {
  var trimmedArray = [];
  var values = [];
  var value;

  for(var i = 0; i < originalArray.length; i++) {
    value = originalArray[i][objKey];

    if(values.indexOf(value) === -1) {
      trimmedArray.push(originalArray[i]);
      values.push(value);
    }
  }

  return trimmedArray;
}

var finalArr = removeDuplicates(anchorTags, 'href');
for (var i = 0; i < finalArr.length; i++) {
	(function(index) {
		var xhr = new XMLHttpRequest();
		var url = (finalArr[index]).href;
		if (location.protocol === 'https:') {
			url = url.indexOf('https:') > -1 ? url : url.replace('http:', 'https:');
		}
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
				if (xhr.status < 400) {
					$('a[href="' + (finalArr[index]).attributes.href.nodeValue + '"]').append(' [Success]');
					console.log('Success');
					return;
				}
				$('a[href="' + (finalArr[index]).attributes.href.nodeValue + '"]').append(' [Failed]');
				console.log('Failed');
		  }
		}
		xhr.send();
	})(i);
}

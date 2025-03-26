function removeHtmlFromUrl() {
    if (window.location.href.endsWith('.html')) {
      const newUrl = window.location.href.replace('.html', '');
      history.replaceState(null, '', newUrl);
    }
  }
  
removeHtmlFromUrl(); 
  
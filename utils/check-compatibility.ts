


export async function checkBrowserCompatibility() {
  // Check if Browser is Chrome or Firefox
  if (
    !(window.navigator.userAgent.indexOf('Firefox') !== -1 ||
    window.navigator.userAgent.indexOf('Chrome') !== -1)
  ) {
    return false;
  }
    return true
}


 


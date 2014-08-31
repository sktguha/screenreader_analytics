main();
function main()
{
if(document.URL!="http://screenreader.mybluemix.net/")
return;
//alert("bluemix service");
}
window.onload=function(e){
document.getElementsByTagName("H1")[0].innerText="Screenreader data storage";
document.getElementsByTagName("H2")[0].innerText="Debug Operations:";
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });
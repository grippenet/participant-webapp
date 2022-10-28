
export const getOpenExternalPageHandler = (url: string, target: '_blank' | '_self') => {
  if (! url ) 
    return () => {console.log("external link is empty")}; 
  
  if (target === '_blank') 
    return() => {window.open(url, "_blank")};
  
  return () => {document.location.href = `${url}`};
}


function makeBreadCrumbs() {
  //Try to figure out current TocItem from URL
  let fileNameWHash = window.location.href.split("/").pop();
  let fileName = fileNameWHash.split("#")[0];

  //Find just the filename in ToC
  let tocEntry = document.querySelector('#ptx-toc a[href="' + fileName + '"]');
  if (!tocEntry) {
      return; //complete failure, get out
  }

  //See if we can also match fileName#hash
  let tocEntryWHash = document.querySelector(
      '#ptx-toc a[href="' + fileNameWHash + '"]'
  );
  if (tocEntryWHash) {
      //Matched something below a subsection - activate the list item that contains it
      tocEntryWHash.closest("li").classList.add("active");
  }

  let list = '';
  let current = tocEntry.closest("ul").closest("li");
  while(current) {
    let link = current.querySelector(".toc-title-box a")
    let title = link.querySelector("span.title")
    list = `<a href="${link.href}">${title.textContent}</a>` + ' › ' + list;
    current = current.parentElement.closest("li");
  }
  if (list.length > 0) {  // remove last ' > '
    list = list.slice(0, -3);
  }
  let crumbs = document.createElement('div');
  crumbs.classList.add('ptx-breadcrumbs');
  crumbs.innerHTML = list;
  document.querySelector('.ptx-main > .ptx-content').insertAdjacentElement('afterbegin', crumbs);
}

window.addEventListener("DOMContentLoaded", function(event) { makeBreadCrumbs(); });
programAccordItems.forEach((element) => {
	const programAccordHeader = element.querySelector(".accord-header");
	programAccordHeader.addEventListener("click", () => {
		handlerAccordToggle(element);
	});
});
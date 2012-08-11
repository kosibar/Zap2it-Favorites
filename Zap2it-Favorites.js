/*
	Zap2It Favorites Bookmarklet
	
	This is a bookmarklet that modifies the Zap2It TV Listing so that only
	your favorites are shown.
	
	To use this bookmarklet you have to create a (free) account on Zap2It
	and mark some shows as favorites.

	Elements:
	table#aff_header  the very top of the page with the logo, tabs, etc.
	table#aff_footer  the very bottom of the page with links, copyright, etc.
	div#zc-topbar     the top bar with ad, preferences, etc.
	div#zc-footer     the bottom bar with copyright information
	div#aff_wrapper   wrapper around the main content of the page
	div#zc-grid       wrapper around the entire TV listing grid
	div.zc-tn         time rows
	div#zc-tn-top     the first time row
	table.zc-row      a row on the grid - each row is its own table
	td.zc-pg          a cell on the grid
	td.zc-g-F         a cell on the grid that contains a favorite
	td.zc-st          the cells on the grid that contain the station name and logo
	td.zc-pg          the cells on the grid that contain the programs
	.zc-tn-l          left arrow to change the time you're viewing
	.zc-tn-r          right arrow to change the time you're viewing
	div.zc-grid-ad    banner ads within the grid
	a.zc-pg-t         the <a> tag that contains the program title
	.zc-pg-e          episode name shown in program cells
	ul.zc-icons       icons in the program cells that specify things like "new", "live", etc.
	.zc-pg-y          the year shown in program cells
	.zc-ic-s          special text in program cells (eg. all CC spans also have this class)
	.zc-ic-cc         closed caption shown in program cells
*/
javascript:void((function() {
	// don't run more than once on the same page
	if($('#alreadyNice').length==0) {
		// insert a flag so we know it's already been run
		$('#aff_wrapper').before('<input type="hidden" id="alreadyNice" value="" />');

		// automatically highlight favorites - this isn't necessary, just a convenience
		$('#zc-grid').addClass('zc-favorites');
		
		// hide all but the first time row
		$('div.zc-tn').hide();
		$('div#zc-tn-top').show();
		
		// add "noFavorites" flag on all rows and cells on the grid
		$('table.zc-row,td.zc-pg').addClass('noFavorites');
		
		// remove "noFavorites" flag from favorite cells and rows with a favorite cell
		$('table.zc-row:has(td.zc-g-F)').removeClass('noFavorites');
		$('td.zc-g-F').removeClass('noFavorites');

		// remove rows with no favorites and content from cells that aren't favorites
		$('table.noFavorites').remove();
		$('td.noFavorites').html(' ');

		// make borders darker - on the new compact view they kind of run together
		$('table.zc-row').css('border-bottom','2px solid #555555');
		
		// remove the height style for rows and images station logo images so everything is compact
		$('.zc-st,.zc-pg').css('height','auto');
		$('td.zc-st img').remove();
		
		// remove links from favorites
		$('td.zc-g-F').each(function() {
			$(this).prepend('<div style="padding: 1px 5px; font-weight: bold;">'+$(this).find('a.zc-pg-t').first().text()+'</div>');
		});
		
		// hide everything else that clutters the display
		$('a.zc-tn-r,a.zc-tn-l,div.zc-grid-ad,.zc-icons,span.zc-pg-y,span.zc-ic-s,#zc-topbar,#aff_header,#aff_footer,span.zc-pg-e,a.zc-pg-t').remove();
	}
})());
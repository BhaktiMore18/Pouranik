# Testing Guide for Sorting and Filtering Features

## How to Test the New Features

### 1. Basic Search and Filter Testing

1. **Navigate to the Explore page** (`http://localhost:5173/explore` or click "Explore" in navigation)

2. **Perform a basic search:**
   - Enter "Harry Potter" in the search box
   - Click "Search Books"
   - Observe the results

3. **Test sorting options:**
   - After getting results, use the "Sort By" dropdown
   - Switch between "Relevance" and "Newest First"
   - Notice how results reorder automatically

### 2. Filter Testing

#### Test Availability Filters:
- **Free eBooks**: Select "Free eBooks" from the Availability dropdown
- **Full Text Available**: Select "Full Text Available" 
- **Preview Available**: Select "Preview Available"
- **All eBooks**: Select "All eBooks"

#### Test Content Type Filters:
- **Books Only**: Select "Books Only" from Content Type
- **Magazines Only**: Select "Magazines Only"
- **All Types**: Select "All Types" (default)

#### Test Language Filters:
- **English**: Select "English" from Language dropdown
- **Spanish**: Select "Spanish" 
- **French**: Select "French"
- Try other languages available in the dropdown

### 3. Quick Filter Testing

After performing a search, you'll see quick filter buttons at the top:

1. **Free eBooks** - Instantly filters to free books
2. **Newest Books** - Sorts by publication date
3. **Full Preview** - Shows books with full text preview
4. **English Books** - Filters to English language books
5. **All eBooks** - Shows only electronic books

Click each button and observe how the results change instantly.

### 4. Combined Filter Testing

Test multiple filters together:
1. Search for "science fiction"
2. Set Sort to "Newest First"
3. Set Availability to "Free eBooks"
4. Set Language to "English"
5. Observe the filtered results

### 5. Filter Persistence Testing

1. Apply some filters (e.g., sort by newest, English language)
2. Navigate away from the Explore page
3. Return to the Explore page
4. Perform a new search
5. Observe that your previous filter preferences are remembered

### 6. Active Filter Indicators

1. Apply multiple filters
2. Check the "Active filters" section at the bottom of the filter controls
3. Observe colored badges showing applied filters
4. Test the "Clear All" button to reset filters

### 7. Results Display Testing

1. Perform a search with filters applied
2. Check the results header for filter indicators
3. Observe small badges showing active filters next to the result count

### 8. Mobile Responsiveness Testing

1. Resize the browser window to mobile size
2. Test that filter controls adapt to smaller screens
3. Verify quick filter buttons wrap properly
4. Check that dropdowns are touch-friendly

## Expected Behaviors

### Sorting
- **Relevance**: Results ordered by Google's relevance algorithm (default)
- **Newest First**: Results ordered by publication date, newest first

### Filtering
- **Free eBooks**: Only shows books available as free downloads
- **Paid eBooks**: Only shows books that require purchase
- **All eBooks**: Shows both free and paid electronic books
- **Full Text Available**: Books where complete text can be viewed
- **Preview Available**: Books with at least partial preview

### Quick Filters
- Should apply multiple filter settings simultaneously
- Should trigger immediate search with new parameters
- Should show visual feedback during application

### Filter Persistence
- Filter preferences should be saved to localStorage
- Should be restored when revisiting the page
- Should persist across browser sessions

## Troubleshooting

### If filters don't seem to work:
1. Check browser console for any JavaScript errors
2. Verify Google Books API key is configured in .env file
3. Try clearing browser cache and localStorage
4. Check network tab for API call parameters

### If no results appear:
1. Try broader search terms
2. Remove restrictive filters (especially language and availability)
3. Check if the Google Books API has data for your query with those filters

### If filter preferences don't save:
1. Check if localStorage is enabled in your browser
2. Try clearing localStorage and testing again
3. Check browser console for storage errors

## API Parameters Being Used

The implementation uses these Google Books API parameters:
- `orderBy`: Controls sorting (relevance, newest)
- `filter`: Controls availability (partial, full, free-ebooks, paid-ebooks, ebooks)
- `printType`: Controls content type (all, books, magazines)
- `langRestrict`: Controls language (ISO 639-1 codes like 'en', 'es', 'fr')

## Performance Notes

- Filters are applied immediately without a separate "Apply" button
- Each filter change triggers a new API call
- Pagination resets to page 1 when filters change
- Results are cached per unique combination of search term and filters

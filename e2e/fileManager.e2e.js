describe('File Manager App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the home screen with browser component', async () => {
    await expect(element(by.id('browser-screen'))).toBeVisible();
    await expect(element(by.id('current-path'))).toBeVisible();
  });

  it('should navigate through directories', async () => {
    // Create a test directory
    const testDirName = 'TestDirectory';
    await element(by.id('create-directory-button')).tap();
    await element(by.id('directory-name-input')).typeText(testDirName);
    await element(by.id('confirm-create-directory')).tap();

    // Verify directory was created and is visible
    await expect(element(by.id(`file-item-${testDirName}`))).toBeVisible();

    // Navigate into the directory
    await element(by.id(`file-item-${testDirName}`)).tap();
    await expect(element(by.id('current-path'))).toHaveText(expect.stringContaining(testDirName));

    // Navigate back
    await element(by.id('back-button')).tap();
    await expect(element(by.id('current-path'))).not.toHaveText(expect.stringContaining(testDirName));
  });

  it('should handle file operations', async () => {
    // Test file creation (e.g., text file)
    const testFileName = 'test.txt';
    await element(by.id('create-file-button')).tap();
    await element(by.id('file-name-input')).typeText(testFileName);
    await element(by.id('confirm-create-file')).tap();

    // Verify file was created
    await expect(element(by.id(`file-item-${testFileName}`))).toBeVisible();

    // Test file selection
    await element(by.id(`file-item-${testFileName}`)).longPress();
    await expect(element(by.id('selection-mode-indicator'))).toBeVisible();

    // Test file operations menu
    await element(by.id('file-operations-menu')).tap();
    await expect(element(by.id('rename-option'))).toBeVisible();
    await expect(element(by.id('delete-option'))).toBeVisible();
    await expect(element(by.id('share-option'))).toBeVisible();

    // Test rename operation
    const newFileName = 'renamed.txt';
    await element(by.id('rename-option')).tap();
    await element(by.id('new-file-name-input')).typeText(newFileName);
    await element(by.id('confirm-rename')).tap();

    // Verify file was renamed
    await expect(element(by.id(`file-item-${newFileName}`))).toBeVisible();
    await expect(element(by.id(`file-item-${testFileName}`))).not.toBeVisible();

    // Test delete operation
    await element(by.id(`file-item-${newFileName}`)).longPress();
    await element(by.id('file-operations-menu')).tap();
    await element(by.id('delete-option')).tap();
    await element(by.id('confirm-delete')).tap();

    // Verify file was deleted
    await expect(element(by.id(`file-item-${newFileName}`))).not.toBeVisible();
  });

  it('should handle multi-select operations', async () => {
    // Create test files
    const testFiles = ['test1.txt', 'test2.txt', 'test3.txt'];
    
    for (const fileName of testFiles) {
      await element(by.id('create-file-button')).tap();
      await element(by.id('file-name-input')).typeText(fileName);
      await element(by.id('confirm-create-file')).tap();
      await expect(element(by.id(`file-item-${fileName}`))).toBeVisible();
    }

    // Enable multi-select mode
    await element(by.id('multi-select-button')).tap();

    // Select multiple files
    for (const fileName of testFiles) {
      await element(by.id(`file-item-${fileName}`)).tap();
      await expect(element(by.id(`file-item-${fileName}-selected`))).toBeVisible();
    }

    // Test bulk delete
    await element(by.id('bulk-delete-button')).tap();
    await element(by.id('confirm-bulk-delete')).tap();

    // Verify all files were deleted
    for (const fileName of testFiles) {
      await expect(element(by.id(`file-item-${fileName}`))).not.toBeVisible();
    }
  });

  it('should handle media files correctly', async () => {
    // Note: This test assumes there's an image file in the app's test assets
    const imageFileName = 'test-image.jpg';
    
    // Navigate to the image file
    await expect(element(by.id(`file-item-${imageFileName}`))).toBeVisible();
    
    // Open image viewer
    await element(by.id(`file-item-${imageFileName}`)).tap();
    
    // Verify image viewer is shown
    await expect(element(by.id('image-gallery-view'))).toBeVisible();
    
    // Test image viewer controls
    await element(by.id('zoom-in-button')).tap();
    await element(by.id('zoom-out-button')).tap();
    
    // Close image viewer
    await element(by.id('close-image-viewer')).tap();
    
    // Verify we're back at the browser screen
    await expect(element(by.id('browser-screen'))).toBeVisible();
  });

  it('should handle search functionality', async () => {
    // Open search
    await element(by.id('search-button')).tap();
    
    // Enter search query
    await element(by.id('search-input')).typeText('test');
    
    // Verify search results
    await expect(element(by.id('search-results'))).toBeVisible();
    
    // Clear search
    await element(by.id('clear-search')).tap();
    
    // Verify we're back to normal view
    await expect(element(by.id('search-results'))).not.toBeVisible();
  });

  it('should handle sorting and filtering', async () => {
    // Open sort menu
    await element(by.id('sort-menu-button')).tap();
    
    // Test different sort options
    await element(by.id('sort-by-name')).tap();
    await element(by.id('sort-menu-button')).tap();
    await element(by.id('sort-by-date')).tap();
    await element(by.id('sort-menu-button')).tap();
    await element(by.id('sort-by-size')).tap();
    
    // Open filter menu
    await element(by.id('filter-menu-button')).tap();
    
    // Test different filters
    await element(by.id('filter-images')).tap();
    await element(by.id('filter-menu-button')).tap();
    await element(by.id('filter-documents')).tap();
    await element(by.id('filter-menu-button')).tap();
    await element(by.id('filter-all')).tap();
  });
});

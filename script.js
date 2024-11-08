// Add this to update the breadcrumb based on the current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = document.getElementById('current-page');
    // Get the current page title or path
    const pageName = document.title.replace(' - Swizzl AI', '');
    currentPage.textContent = pageName;
}); 
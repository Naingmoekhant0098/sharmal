function _LinkifyService(text) {
    if (!text) return '';
  
    // Line breaks
    const withLineBreaks = text.replace(/\\n|(?:\r\n|\r|\n)/g, '<br />');
  
    // Linkify URLs
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    const withLinks = withLineBreaks.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  
    // Linkify phone numbers (starts with 09 or +95 and has 7-13 digits)
    const phoneRegex = /(?:\+?95|0)9\d{7,13}/g;
    const withPhones = withLinks.replace(phoneRegex, (phone) => {
      const cleanPhone = phone.replace(/\s+/g, '');
      return `<a href="tel:${cleanPhone}" style="color:#5B1144;">${phone}</a>`;
    });
  
    return withPhones;
  }
  export default _LinkifyService;
  
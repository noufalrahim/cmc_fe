export const formatDateTime = (timestamp: string | number | Date) => {

  if(!timestamp) {
    return '';
  }

    const dateObj = new Date(timestamp);
  
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = dateObj.getFullYear();
  
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    const date = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}${ampm}`;
  
    return `${date} ${time}`;
  };
  
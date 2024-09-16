export const data =[
    {
        text1:'#0123456',
        text2:'Payment Received',
        text3:'10 Sept 24',
        text4:'02:24 pm',
        text5:'150.25',
        text6:'≈ ₦35,479.97'
    },
    {
        text1:'#0123456',
        text2:'Payment Received',
        text3:'10 Sept 24',
        text4:'02:24 pm',
        text5:'150.25',
        text6:'≈ ₦35,479.97'
    },
    {
        text1:'#0123456',
        text2:'Payment Received',
        text3:'10 Sept 24',
        text4:'02:24 pm',
        text5:'150.25',
        text6:'≈ ₦35,479.97'
    },
    {
        text1:'#0123456',
        text2:'Payment Received',
        text3:'10 Sept 24',
        text4:'02:24 pm',
        text5:'150.25',
        text6:'≈ ₦35,479.97'
    },
    {
        text1:'#0123456',
        text2:'Payment Received',
        text3:'10 Sept 24',
        text4:'02:24 pm',
        text5:'150.25',
        text6:'≈ ₦35,479.97'
    },
    {
        text1:'#0123456',
        text2:'Payment Received',
        text3:'10 Sept 24',
        text4:'02:24 pm',
        text5:'150.25',
        text6:'≈ ₦35,479.97'
    },
]


export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);
    return `${day} ${month}, ${year}`;
  }
  
  const formattedDate = formatDate("2024-09-09T19:43:45.000Z");
  console.log(formattedDate); 
  
  export function formatTime(dateString:string) {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    const minutesStr = minutes < 10 ? '0' + minutes : minutes; // Add leading zero if necessary
  
    return `${hours}:${minutesStr}${ampm}`;
  }
  
  const dateStr = "2024-09-09T19:43:45.000Z";
  console.log(formatTime(dateStr)); // Output: "7:43pm"
  

export const formatAmount = (value: string) => {
    // Remove any commas from the string
    const numericValue = value.replace(/,/g, '');
    
    // Format the number with commas
    return new Intl.NumberFormat().format(Number(numericValue));
  };

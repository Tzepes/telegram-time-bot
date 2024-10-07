export function GetTimeAndZone() {
    const now = new Date();

    // Get the current time (hours, minutes, seconds)
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Get the timezone offset (in minutes)
    const offset = now.getTimezoneOffset(); // Offset in minutes from UTC
    const hoursOffset = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
    const minutesOffset = Math.abs(offset % 60).toString().padStart(2, '0');
    const sign = offset > 0 ? "-" : "+"; // Adjust the sign

    // Combine the time and the formatted GMT offset
    const gmtOffset = `GMT${sign}${hoursOffset}:${minutesOffset}`;
    const timeWithTimezone = `${hours}:${minutes}:${seconds} ${gmtOffset}`;

    return timeWithTimezone;
}

export function GetTimeInCountry(timeZone: string): string {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: timeZone,
        hour: '2-digit' as '2-digit',  // Explicitly specifying the literal type
        minute: '2-digit' as '2-digit', // Explicitly specifying the literal type
        second: '2-digit' as '2-digit', // Explicitly specifying the literal type
        hour12: false
    };

    const formatter = new Intl.DateTimeFormat([], options);
    return formatter.format(new Date());
}
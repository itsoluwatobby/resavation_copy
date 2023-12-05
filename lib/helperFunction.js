"use client"

/**
 * @desc reduceTextLength: function to truncate content length
 * @param content text to truncate
 * @param maxLength desired length to truncate to (default is 20 characters)
 * @param option ("letter" | "word") default letter
 * @returns truncated content
 */
export const reduceTextLength = (content, maxLength=20, option='letter') => {
  let responseOutput = '';
  if(option == 'letter'){
    responseOutput = content?.length > maxLength ? content?.substring(0, maxLength) +'...' : content
  }
  else if(option == 'word'){
    responseOutput = content?.split(' ')?.length > maxLength ? content?.substring(0, maxLength * 4) +'...' : content
  }
  return responseOutput
}

/**
 * @desc checkLength: function that checks the length of a content
 * @param content
 * @Return returns content length
 */
export const checkLength = (content) => {
  return content?.split(' ')?.length
}

/**
 * @desc formatPrice: function to format price into human readable form
 * @param {*} price
 * @Return returns formatted price
 */

export const formatPrice = (price=0) => {
  let formattedPrice;
  const priceToString = price?.toString()
  const length = priceToString?.length

  length === 4 
      ? formattedPrice = `${priceToString?.substring(0,1)},${priceToString?.substring(1)}` 
          : length === 5 ? formattedPrice = `${priceToString?.substring(0,2)},${priceToString?.substring(2)}`
              : length === 6 ? formattedPrice = `${priceToString?.substring(0,3)},${priceToString?.substring(3)}`
                  : length === 7 ? formattedPrice = `${priceToString?.substring(0,1)},${priceToString?.substring(1,4)},${priceToString?.substring(4)}`
                      : length === 8 ? formattedPrice = `${priceToString?.substring(0,2)},${priceToString?.substring(2,5)},${priceToString?.substring(5)}`
                          : length === 9 ? formattedPrice = `${priceToString?.substring(0,3)},${priceToString?.substring(3,6)},${priceToString?.substring(6)}`
                          :  formattedPrice = `${priceToString}`

  return formattedPrice
}

/**
 * @desc dateFormatter: function to change the date format to {Year/Month/Day}
 * @param {*} date format {Day/Month/Year}
 * @Return returns formatted date
 */

export const dateFormatter = (date) => {
  let minimumDate;
  minimumDate = date?.split("/");
  if (minimumDate[0]?.length == 1 && minimumDate[1]?.length == 1) {
    minimumDate = `${minimumDate[2]}-0${minimumDate[0]}-0${minimumDate[1]}`;
  } else if (minimumDate[0]?.length > 1 && minimumDate[1]?.length == 1) {
    minimumDate = `${minimumDate[2]}-${minimumDate[0]}-0${minimumDate[1]}`;
  } else if (minimumDate[0]?.length == 1 && minimumDate[1]?.length > 1) {
    minimumDate = `${minimumDate[2]}-0${minimumDate[0]}-${minimumDate[1]}`;
  } else {
    minimumDate = `${minimumDate[2]}-${minimumDate[0]}-${minimumDate[1]}`;
  }
  return minimumDate
}

/**
 * @desc returnObjectOrString - iterates through an array
 * @param {*} mixedValues
 * @returns an object or a string
 */
export function returnObjectOrString(mixedValues, guestUserEmail) {
  let foundObject = null;
  
  if (typeof mixedValues === 'undefined') return null;
 
  for (const value of mixedValues) {
    if (typeof value === 'object' && value !== null && value?.members?.includes(guestUserEmail)) {
      foundObject = value;
      break;
    }
  }
  if (foundObject !== null) return foundObject;
  else {
    // If no object is found, return the string (if it exists) else null
    const stringValue = mixedValues?.find(value => typeof value === 'string');
    return stringValue !== undefined ? stringValue : null;
  }
}

export const SuccessStyle = {
  duration: 8000, icon: '🔥',
  style: { 
    background: '#3CB371', color: '#FFFFFF',
    fontSize: '13px' 
  }
}

export const subscribeEmailAlert = {
  duration: 5000, 
  style: { background: '#3CB371', 
    color: '#FFFFFF',
    fontSize: '13px' 
  }
}

export const ErrorStyle = {
  duration: 10000,
  style: {
    background: '#FF0000', 
    color: '#FFFFFF',
    fontSize: '13px'
  }
}


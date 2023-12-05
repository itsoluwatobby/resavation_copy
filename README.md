# RESAVATION.NG

### Resavation.ng is an initaitive to solve real estate problems in Nigeria and Resavation also goes beyond just solving the issue, by also creating a seamless, product filled and well secured platform that openly welcomes everyone interested in real-estate business.

Resavation offers Two amazing products
1. A roommate finder platform
2. An apartment rentage platform


---
<br/>

> **Technology Used**
* Javascript
* Nextjs
* Smile ID verification
* Firebase (GCP)
* Java - Spring boot (For backend development)


<br/>

> _For contributions_

```javascript
  //  Getting started
  git clone <repo-link>
  
  // then you pull in from the dev branch
  git pull origin dev

  // create your own branch with this format
  git checkout -b <yourName-taskYouAreWorkingOn>

  // Then install the dependencies by running
  npm install or npm i

```

<br/>

---
> LINK TO SWAGGER UI THAT CONTAINS ALL THE **ENGPOINTS** REQUIRED FOR THIS PROJECT**

[TAP TO VIEW ENDPOINTS](http://backend.resavation.com/swagger-ui.html#) 

> For API consumption, we have a global variable and hook you can import to attach the remaining of your endpoint path to.

FOR AUTHENTICATION:

The variable is imported from the lib folder (path - i.e '@/lib/authAxios')

So you import *authAxios* from the given path which has a base url ('http://backend.resavation.com/api/v1/auth')

> This endpoint does not require a token / accessToken. 

It is only meant for endpoint included included in the auth controller on the  [Swagger UI](http://backend.resavation.com/swagger-ui.html#/auth-controller) 

<br/>

THIS IS A PUBLIC ENDPOINT: -authPublic

The variable is imported from the lib folder (path - i.e '@/lib/authAxios')

So you import *authPublic* from the given path which has a base url ('http://backend.resavation.com/api/v1')

> This endpoint does not require a token / accessToken also. 

> [Swagger UI](http://backend.resavation.com/swagger-ui.html#/) 

<br/>

THIS IS A PRIVATE ENDPOINT: -axiosPrivate

The variable is imported from the lib folder (path - i.e '@/hooks/useAxiosPrivate')

So you import *axiosPrivate* from the given path which has a base url ('http://backend.resavation.com/api/v1')

> This endpoint does not require a token / accessToken also. Because the token in this case has been attached globally 

> This is meant for all endpoint that requires a token [Swagger UI](http://backend.resavation.com/swagger-ui.html#/) 

**Description**

 useAxiosPrivate is an axios api in which the token have beeen attached to already
 * it is expected to perform an automatic refetch in cases where the token expires

**HOW TO:**
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'

const axiosPrivate = useAxiosPrivate()
 
const res = await axiosPrivate.post(url, <b>option</b>)
 
  * url - a string containing the remaining path to the enpoint you want to consume. You can also attach your params or query params to it
  * option - is an object the may include the object you want to send, or may be you to need to add more configurations to the header property. In a nutshell; it solely depends on what your endpoint requires

 so your resulting data will be extracted from res?.data<br/>
 I.e: console.log(res?.data)

 * <b>NOTE</b> - YOU DO NOT NEED TO ATTACH THE TOKEN


---


<br/>

> More instructions

_**FIREBASE:**_  USED FOR IMAGE UPLOAD AND CHAT APPLICATION

Google firebase is used for image storage and it is also the service used for the chat application.
_Meaning_: On all the images used on Resavation are stored in Google cloud.

```
  Available folder for images
  NOTE: This folders are case sensitive, so use as seen

  1) chatImages
  2) apartmentImages 
  3) profileImage


  HOW TO:
  You are to import *imageUpload* function from the lib folder
  i.e (import {imageUpload} from '@/lib/fileUpload') you can decide to write the full path

  The function takes in two parameters, the (image file, path)
  the *path* argument is anyone of the folders I listed above (chatImages | apartmentImages | profileImage)

  It's an async function which returns an object that contains a status and the image url 
  
  I.e:
  const res = await imageUpload(image, 'profileImages') 
  console.log(res) // onsuccess { status: 'success', url: url_string }
  console.log(res) // onerror { status: 'failed', url: '' }

  it is this imageURL you attach to your data and send to the server
```

<br/>

> OTHER HELPER FUNCTIONS

This functions can be found in the '@/lib/helperFunction' folder 
import { reduceTextLength, formatPrice, dateFormatter } from '@/lib/helperFunction'

1. reduceTextLength -
  
      **@desc** reduceTextLength: function to truncate content length<br/>
      **@param** content text to truncate<br/>
      **@param** maxLength desired length to truncate to (default is 20 characters)<br/>
      **@param** option ("letter" | "word") default letter<br/>
      **@returns** truncated content

2. formatPrice - 

    @desc formatPrice: function to format price into human readable form<br/>
    @param {*} price<br/>
    @return returns formatted price<br/>

3. dateFormatter - 

    @desc dateFormatter: function to change the date format to {Year/Month/Day}<br/>
    @param {*} date format {Day/Month/Year}<br/>
    @return returns formatted date<br/>

---

<br/>

**NOTE:**  If there are typos in the above information or in this same sentence, please bear with me and do let me know.

> HAPPY CODING ✌️

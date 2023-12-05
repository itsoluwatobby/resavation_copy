import { imageStorage } from './firebase'
import { nanoid } from "nanoid";
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'

/**
 * @desc imageUpload: function to upload images to firebase
 * @param image image file 
 * @param storePath firebase path to tore image (chatImages | apartmentImages | profileImage)
 * @Return returns an object. onSuccess {status: "success", url: string}
 *                            onError {status: "failed", url: ''}
 * @desc storePath: image storage container. The store container for this project
 * includes: chatImages | apartmentImages | profileImage
 * The format given above is the exact format of the container names in firestore
 */
export const imageUpload = (image, storePath) => {

  return new Promise((resolve, reject) => {
    const photoName = `${image.name}-resavation-${nanoid(5)}`
    const storageRef = ref(imageStorage, `resavationImages/${storePath}/${photoName}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    
    uploadTask.on('state_changed', (snap) => {
      console.log('')
    },(error) => {
        reject({status: "failed", url: ''})
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(downloadUrl => {
          return resolve({status: 'success', url: downloadUrl})
        })
        .catch(error => {
          return reject({status: 'failed', url: ''})
        })
      }
    )
  })
}
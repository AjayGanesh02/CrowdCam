# CrowdCam

## Inspiration

Every day, millions of photos are taken worldwide. From mobile phones to professional DSLRs, cameras capture every moment of our waking lives, generating a vast wealth of data. Yet, much of that data goes unused by the very people captured in these photos. Imagine a sporting event or concert where you were able to scan for photos taken of you by other people, allowing you to relive those precious memories one more time. This futuristic idea is a reality with [CrowdCam](https://crowdcam.club).

## What it does

CrowdCam users can upload banks of images that they take. Other users can then upload a reference photo of themselves, and our state of the art facial recognition software does the work of finding all images containing the face shown in the reference image.

## How we built it

CrowdCam is a Next.js application, and so harnesses React and Node.js for fullstack application development. The serving stack is powered by Vercel, which also provides our CD pipeline through its GitHub integration, and our database through Vercel KV. We used AWS extensively for much of our backend logic, and specifically dealt with S3 for blob storage and Rekognition for the actual face detection and recognition.

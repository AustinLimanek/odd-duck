# odd-duck

Repository for week three of Code Fellows 201

This application allows for users to move through 25 rounds of 5 randomly selected photos from a pool of 19 photos. The user selects the photo that they believe is superior to the others.

Bias between rounds in minimized in two ways: First, photos during an given round will all be unique. Second, the preceding round will not have duplicate images to the current five.

Once the survey is completed, the user may submit the results. On submission, the data is visualized using two charts. One shows both the number of views of each image and number of clicks that they have after the survey. The other graph is a success rate over the full survey. Futhermore, since the data is persisted, users may take the survey multiple times and the new data will append to the existing data sets. Charts will also update.

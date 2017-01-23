# ephhacks2017
Project for ephhacks 2017 Williams College Hackathon

EphVision
Amelia Archer, Landon Marchant,  Kurt Pfrommer

Goal: Make the Williams College website more accessible to people who are blind or visually impaired

Project: Takes image urls from Williams College website (www.williams.edu) and using Google apps script, facilitates crowdsourcing of image descriptions for blind and visually impaired people who visit the college website. We crowdsource our image descriptions using Google Forms, emailing each volunteer a form containing a portion of the images that need to be labeled, from which descriptions will be collected and aggregated.

Python code for web scraper and image url finder currently makes data that require a lot of cleaning, and only finds images that are not interactive. We will need to modify our image finder to find all images on the page. We hope to get a cleaner url data set from the Williams Office of Information Technology (OIT), and with the help of the Williams student body, we will quickly be able to provide OIT with image descriptions that can then be added to each image on the website in a way that is accessible to screen readers.

Additional leg work is needed to get image urls into a Google spreadsheet, but this can be automated later with the Google apps scripts API. Finally, the data collected in each form still needs to be aggregated into a single spreadsheet.

TO DO:
- aggregate form responses (make sure description matches image in url!)
- automate Google scripts
  - making spreadsheet from url and email/Williams unix file (to then run existing script on)
  - setting how many images per form
- get cleaner, more complete data set
  - improve web scraper!!
  - Ask OIT for data
- Talk to OIT people about collaboration

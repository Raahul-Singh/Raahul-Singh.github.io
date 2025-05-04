---
title: "Chapter 1: Apricity"
date: 2020-06-15T00:00:00+0530
description: "An endeavour to better understand our Sun's choleric disposition"
tags: ["GSoC", "Medium"]
status: "finished"
confidence: "certain"
released: true
draft: false
---

<figure>
  <img src="/images/bhagirathi.png" alt="Bhagirathi">
  <figcaption><strong>The Bhagirathi Massif</strong>. The mountain is named after <a href="https://en.wikipedia.org/wiki/Bhagiratha">Bhagiratha</a>, the legendary king of the Ikshvaku dynasty who brought the River Ganges, to Earth from the heavens. It symbolizes the flow of divine knowledge, or the knowledge of liberation (Ganga), into human consciousness (earth) by the grace of God (Shiva) and the austere efforts of enlightened masters (Bhagiratha).
</figcaption>
</figure>


>ॐ भूर् भुवः स्वः।

>तत्सवितुर्वरेण्यं भर्गो॑ देवस्य धीमहि।

>धियो यो नः प्रचोदयात् ॥

There is some beauty in the fact that the essence of my undertaking needs not more than 24 letters of explanation.

What I have written above in the [Devanagari](https://en.wikipedia.org/wiki/Devanagari) script is one of the most important and highly revered Vedic hymns, the Gayatri Mantra. As translated by [Dr S. Radhakrishnan](https://en.wikipedia.org/wiki/S._Radhakrishnan), it states,

>"We meditate on the effulgent glory of the divine Light; may he inspire our understanding."

The goal of my project is to study solar flares. The effulgent glory, the flares, that the divine Light, our Sun, produces. I shall meditate on them over the summer and better my understanding and appreciation of the mechanisms that govern them.

I shall also dare to predict them.

And there you have it,

**Solar Weather Forecasting using linear algebra.**

<div style="text-align: center; margin: 20px 0;">. . .</div>

### The Dataset
When thinking about flares, you may imagine something like this :

<figure>
  <img src="/images/apricity-sun.png" alt="sun">
  <figcaption>On August 31, 2012, a long prominence/filament of solar material that had been hovering in the Sun's atmosphere, the corona, erupted out into space at 4:36 p.m. EDT. Seen here from the <a href="https://en.wikipedia.org/wiki/Solar_Dynamics_Observatory">Solar Dynamics Observatory</a>, the flare caused auroras to be seen on Earth on September 3.
</figcaption>

</figure>

Flares indeed are mesmerizing.

To analyze the properties of flares, we must understand what flares are.

A [solar flare](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#FLARE) occurs when magnetic energy that has built up in the [solar atmosphere](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#SOLAR_ATMOSPHERE) is suddenly released. [Radiation](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#ELECTROMAGNETIC_RADIATION) is emitted across virtually the entire [electromagnetic spectrum](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#ELECTROMAGNETIC_SPECTRUM), from radio waves at the long [wavelength](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#WAVELENGTH) end, through [optical](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#OPTICAL) emission to [x-rays](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#X_RAY) and [gamma rays](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#GAMMA_RAY) at the short wavelength end. The amount of energy released is the equivalent of millions of 100-[megaton](https://hesperia.gsfc.nasa.gov/sftheory/glossary.htm#MEGATON) hydrogen bombs exploding at the same time!

These flares emanate from active regions (ARs) in which high magnetic non-potentiality resides in a wide variety of forms.

**Active regions** on the Sun are places where the Sun's magnetic field is disturbed. These **regions** frequently spawn various types of **solar activity**, including explosive **"solar storms"** such as **solar flares** and coronal mass ejections (**CME**).

What you see below, is a full disk Line of Sight (LOS) Magnetogram, which is an image of the sun's magnetic field in the line of sight of the observer.

The data used in this project comes from [Sunspotter](https://www.sunspotter.org/), which is a dataset of such magnetograms with some measured properties for each Active Region.

<figure>
  <img src="/images/apricity-fulldisk-magnetogram.png" alt="Fulldisk Magnetogram">
  <figcaption style="text-align: center;">A full disk Magnetogram</figcaption>
</figure>

<figure>
  <img src="/images/apricity-ar1.png" alt="An Active Region">
  <figcaption style="text-align: center;">An Active Region</figcaption>
</figure>

<figure>
  <img src="/images/apricity-ar2.png" alt="Another Active Region">
  <figcaption style="text-align: center;">Another Active Region</figcaption>
</figure>

[Sunspotter](https://www.sunspotter.org/) is a citizen science project that asked volunteers to classify solar active regions by their complexity — as it's believed complexity has a direct relationship with their activity. With more than 25,000 volunteers and millions of classifications produced, we've got a [very nice dataset](https://zenodo.org/record/1478972#.XI4YPqHgqr8). The images used come from the [MDI instrument](http://soi.stanford.edu/science/obs_prog.html), which is onboard of [SOHO](https://en.wikipedia.org/wiki/Solar_and_Heliospheric_Observatory) — the NASA-ESA mission that's been observing the sun for more than two decades.

All of the Active Region observations have a corresponding image, like the ones you see here.

The dataset is composed of five files:

- **lookup_timesfits.csv**: lists the filenames and the date of the data acquisition.
- **lookup_properties.csv**: lists the properties of the active region observed in each frame to be classified.
- **classifications.csv**: lists each classification made by the volunteers.
- **rankings.csv**: lists the final ranking on complexity.

The score provided on the rankings file follows the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system).

I have [recreated the ELO rating algorithm in python](https://github.com/Raahul-Singh/pythia/pull/26), to reassign complexity score to the Active Regions. This gives us better control over the range of values, which in turn can be tuned to match the sensitivity of the forecasting model.

<div style="text-align: center; margin: 20px 0;">. . .</div>

### Apollo's chosen one

<figure>
  <img src="/images/apricity-delphi.png" alt="Priestess of Delphi">
  <figcaption style="text-align: center;">Priestess of Delphi (1891) by <a href="https://en.wikipedia.org/wiki/John_Collier_(Pre-Raphaelite_painter)">John Collier</a>, showing the Pythia sitting on a tripod with vapour rising from a crack in the earth beneath her.</figcaption>
</figure>



Apollo, the Greek god of the Sun, was also the god of prophecies. It is said that when Apollo wished to speak to the mortals, he would speak through his chief priestess, the Oracle of Delphi. She, who alone could understand Apollo's whims and fancies. The High priestess, [**_Pythia_**](https://en.wikipedia.org/wiki/Pythia).

In reverence, I have thus decided to name the repository that holds the code for this project, [**Pythia**](https://github.com/Raahul-Singh/pythiahttps://github.com/Raahul-Singh/pythia).

### Pythia, for Solar Active Region Data Analysis.
Although we have just started, there is a lot you can do with Pythia already.

To install Pythia, for now, run the following command:

<script src="https://gist.github.com/Raahul-Singh/2185031b6e68f32109dec490b7972fe5.js"></script>

Some of the functionalities that Pythia offers, as of writing this post are:

Using Pythia, you can get the measured properties of any AR in the Sunspotter dataset. This is done using [SunPy's HEK](https://docs.sunpy.org/en/stable/guide/acquiring_data/hek.html) module. This is the function description:

<script src="https://gist.github.com/Raahul-Singh/572f2b8b10d988f339ae9caf61445c72.js"></script>

You can also download the full disk MDI magnetograms. This uses [SunPy's FIDO](https://docs.sunpy.org/en/stable/guide/acquiring_data/fido.html) module to get the magnetogram as a FITS file. The following function returns an [MDI map](https://docs.sunpy.org/en/stable/guide/data_types/maps.html) for a given observation date. Should the observation date not be in the Sunspotter dataset CSV files currently loaded in the Sunspotter object, the observation date nearest to the given observation date is used.

<script src="https://gist.github.com/Raahul-Singh/0b21103bde4bbd56c69784ce43302709.js"></script>

Should you wish for all the maps in a given range, you can use:

<script src="https://gist.github.com/Raahul-Singh/0fd191fafd107e93aae4269fc9745cae.js"></script>

Finally, if you wish to plot all the ARs on a full disk magnetogram for which we have data, for any observation date,

<script src="https://gist.github.com/Raahul-Singh/7138ac5c07ff053e62497ac6613dad04.js"></script>

Which, when used for observation date 2002–03–18 09:39:01 gets you the following plot. I have magnified it to highlight the fact that Active Regions come in all shapes and sizes.

<figure>
  <img src="/images/apricity-ar-mapped.png" alt="ARs Plotted on an MDI map">
  <figcaption style="text-align: center;">ARs Plotted on an MDI map</figcaption>
</figure>

<div style="text-align: center; margin: 20px 0;">. . .</div>

What I have given is a brief introduction of the project, along with some code examples. Pythia is in active development and there are modules which I have not mentioned here. I encourage my readers to install Pythia and play around with the code!

If you find any bugs or would like me to add any features, [feel free to open an issue on the main repository](https://github.com/Raahul-Singh/pythia/issues).

My next post will be all about the Exploratory Data Analysis of the Sunspotter data, where we shall delve deep into the Sunspotter dataset.

Till then,

**Divina Luceit Vos!**

:)

<div style="font-style: italic; color: #888888;">(Ported from an earlier Medium <a href="https://medium.com/swlh/chapter-1-apricity-aef3bd172dab">post</a>)</div>
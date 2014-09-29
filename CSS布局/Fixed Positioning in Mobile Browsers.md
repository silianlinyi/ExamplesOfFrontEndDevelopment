Fixed positioned elements (typically headers or footers) are extremely common conventions for native mobile platforms, 
so naturally fixed elements found their way into mobile browsers. Web designers are used to fixing elements to the window 
using CSS’s position: fixed, however, in the land of mobile browsers, support for fixed positioning is far less universal 
and is way more quirky.

I set up a demo to test fixed positioning support across mobile browsers. You can view the demo here. I was particularly 
curious to see how fixed positioning worked without disabling the user’s ability to scale the page.

## The Test
The actual test is as absurdly simple as you can get.

```
header {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
}
```

Talk about basic. Let’s see how this is supported on mobile browsers.

## Mobile CSS Fixed Positioning Support

**Mobile Safari**
iOS5 and after has strong support for fixed positioning. iOS4 and below simply treats elements as static 
and scrolls them along with the rest of the page.

**Android**

* Android 2.1 and below no fixed positioning.
* Android 2.2 awkwardly snaps fixed elements back into position once scrolling is complete.
* Android 2.3 supports fixed positioning, but disabling page scaling is required.
* Android 3 and 4 supports fixed positioning (even without disabling page scaling). Does pretty well performance-wise.
* Blackberry 5.0 supports fixed positioning, although fixed elements are jittery
* Blackberry 7.0 – supports fixed positioning (I could only test on a simulator)
* Blackberry Playbook (1.0.7)- supports fixed positioning. The biggest WTF bug is that it appears the BITMAP all the 
text inside the fixed positioning element, leaving the text fuzzy and jagged.
* Firefox Mobile – Supports fixed positioning as of 6.0 (many thanks to @alex_gibson for testing this). On older versions, 
fixed positioned elements scroll with page and then awkwardly snap back into position once scrolling is complete.
* Opera Mobile – Fixed positioned elements scroll with page and then awkwardly snap back into position once scrolling is 
complete. WTF bug: Opera miscalculates positioning and awkwardly places fixed headers further down the page.
* Opera Mini – nope.
* Windows Phone 7 – both pre and post-Mango ignore fixed positioning and render fixed elements as position: static. 
(Big thanks to @wilto for testing on Mango)
* WebOS – 2.0+ supports fixed positioning
* Amazon Kindle Fire – similar to Android 2.3 in that it supports fixed positioning, but disabling page scaling is required.
* Amazon Kindle (Netfront) – YES!, which is hilarious. Kindle’s browser doesn’t even support color but does a better job at 
fixed positioning than other mobile browsers.
* Nook Color (1st and 2nd gen) – Performs like Android 2.3: supports fixed positioning, but disabling page scaling is required.

## Javascript Solutions
Because mobile browsers lacked of CSS fixed positioning, some very smart people developed Javascript-based fixed-positioning 
solutions. Here are just some of the more popular ones:





import React from 'react';
import './faq.scss';

export class FAQ extends React.Component {

  render() {
    return (
      <div id="faq-page" className='main-content'>
        <div id='text-body' className='light'>
            <div id="titles">
                <h1>FAQ</h1>
                <h2>Frequently Asked Questions</h2>
            </div>
            <div id="faq-questions">
                <details>
                    <summary>What does 'Meat and Right' mean?</summary>
                    <div className='answer'>
                        <p>"Meat and Right" comes from a portion of the Divine Liturgy said most Sundays (the liturgy of St. John Chrysostom) 
                        where the priest says, "Let us give thanks unto the Lord," and the people respond, "It is meet and right." Roman Catholics, 
                        Anglicans, and other liturgical Christians might recognize this as the equivalent to their "It is right and just."</p>
                        <p>So to answer the question - it's a bad pun. (I'm sorry.)</p>
                    </div>
                </details>
                <details>
                    <summary>What are the basics of Eastern fasting?</summary>
                    <div className='answer'>
                        <p>Far be it from me to be any sort of authority on fasting (please reference <a href="http://www.abbamoses.com/fasting.html">this much more thorough guide</a> if you are curious!), but the basics are as follows:</p>
                        <p>Orthodox Christians are commanded to do what's called a "Strict Fast," meaning no meat, dairy, 
                            fish, wine, or oil, every Wednesday and Friday. This is done in memory of Christ's betrayal on 
                            Wednesday and his crucifixion on Friday.
                        </p>
                        <p>There are also four longer fasts done throughout the year. These include <strong>Great Lent</strong> (the 50 days before Pascha),
                            <strong> Nativity Fast</strong> (the 40 days before Christmas/Nativity), the <strong>Apostles Fast</strong> (a varied number of days before the feasts 
                            of Sts. Peter and Paul), and <strong>Dormition Fast</strong> (the two weeks before Dormition). These fasts vary in intensity, as a full 
                            strict fast is not always the daily fasting requirement, but they are all periods where at least meat is fully 
                            abstained from.
                        </p>
                        <p>There are a few other fasting dates sprinkled throuough the year - the eve of Theophany, the Exaltation of the Cross, and the Beheading of John the Baptist - 
                            and there are a few fast-free periods, as well, such as the week after Pascha (called Bright Week) and the week after Pentecost (called Trinity Week).
                        </p>
                        <p>In summary, Orthodox Christians are usually participating in some form of fasting for over half of the year. It's a lot to 
                            keep track of, so I hope this website can be useful to you if you are participating!
                        </p>
                    </div>
                </details>
                <details>
                    <summary>Do shellfish count as fish?</summary>
                    <div className='answer'>
                        <p>No! Shrimp, squid, cuttlefish, octopus, lobster, crab, and snails are all allowed, thanks 
                        to the history of many Orthodox communities being more reliant on them for food (and, perhaps the more 
                        theological reason, being that they do not contain blood, in honor of Christ's blood shed for us). You 
                        can consume them on any fasting day.</p>
                    </div>
                </details>
                <details>
                    <summary>If I'm Orthodox, do I have to follow these fasts?</summary>
                    <div className='answer'>
                        <p>In short: not always, but talk with your priest before modifying if possible.</p>
                        <p>A fuller answer would be that fasting expectations can be different for every Christian according to their needs. 
                            Those with medical issues, psychological issues around food, or any other scenario where abstaining from foods might be harmful 
                            will be immediately encouraged to <strong>not</strong> participate in a strict fast, and instead fast partially or adopt a 
                            different penance. If you're in this situation, speak with your priest - they will be more than happy to advise you and find 
                            a better penance together.
                        </p>
                        <p>Serious medical issues aren't the only thing that might require adjustment to fasts. Children, the sick, the elderly, and pregnant or nursing mothers 
                            are all exempt from strict fasting, though they might be encouraged to try another form of penance if reasonable. Fasting can also be relaxed 
                            when traveling (the usual guidance is to "just do what you can, but don't worry about it"). Another general rule of thumb is that, 
                            if you are receiving hospitality, it is better to receive what you are being served than to discourage someone from being hospitable.
                        </p>
                        <p>To be clear, none of this should be interpreted as license to make your own decisions about what is "best" for you without 
                            consulting a priest for guidance. Certainly don't start a strict fast and wait until you can "get permission" to do something else 
                            if there is possibility of harm, but do your best to seek guidance as you are able.
                        </p>
                    </div>
                </details>
                <details>
                    <summary>If I'm not Orthodox, can I still follow these fasts?</summary>
                    <div className='answer'>
                        <p>Absolutely! You aren't bound to it in the same way that an Orthodox Christian would be, but 
                        you are totally free, and even encouraged, to participate. (I do my best to, and I'm not Orthodox!)</p>
                        <p>An additional note for any Catholics out there: if you (like myself) are a Roman Rite Catholic, 
                            you are still bound to fast from meat on Fridays, Ash Wednesday, and Good Friday, and the latter 
                            two days still require the additional one-full-meal, two-snacks-that-don't-equal-a-meal fasting. If 
                            you are an Eastern Catholic, your fasting probably looks pretty similar (if not identical) to Orthodox 
                            fasting.
                        </p>
                        <p>Just make sure you're aware of what your own rites and/or traditions require of you - Eastern fasting 
                            shouldn't replace that!
                        </p>
                    </div>
                </details>
                <details>
                    <summary>Are these fasting details up-to-date?</summary>
                    <div className='answer'>
                        Yes! The data is all taken from the <a href="https://orthocal.info/">orthocal.info</a> API, and it is 
                        accurate to the official OCA calendar. No matter what part of the world you're in, the current date and time on 
                        your device is what determines the date you are shown, so this website will work even if you've changed time zones.
                    </div>
                </details>
                <details>
                    <summary>Who made this website?</summary>
                    <div className='answer'>
                        This website was created by Kimberly Nachbur, a budding web developer in the Portland, Oregon area. 
                        You can find her on <a href='http://www.twitter.com/kimberlycaritas'>Twitter</a>, or over on her blog at <a href="http://www.kimberlynachbur.com">kimberlynachbur.com</a>.
                    </div>
                </details>
            </div>
        </div>
      </div>
    );
  }
}

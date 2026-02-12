import React from 'react';
import './about.scss';

export class About extends React.Component {

  render() {
    return (
      <div id="about-page" className='main-content'>
        <div id='text-body' className='light'>
            <div id="titles">
                <h1>About</h1>
            </div>
            <div id="about-text">
                <p>Meat & Right is a simple webpage for displaying daily fasting requirements according to the Orthodox Church of America (OCA) calendar. 
                Its goal is to provide a quick way to check fasts, as well as provide a way to plan ahead for future fasts, without having to navigate 
                a myriad of other sources to check the fasting requirements of the day.</p>

                <p>I first created this project as a way to help well-meaning friends and family who wanted to know what my husband & I were eating. 
                    Back then, it was simply titled "What Can Austin and Kimberly Eat?" and only had text descriptions. In early 2023, I realized 
                    this tool might actually be helpful for more than just our loved ones & ourselves - so I decided I was going to polish it up 
                    and make it ready for the public by Great Lent that year. There's still plenty of improvements I'd like to make, but I'm excited 
                    with where it is so far!
                </p>
                
                <p>All images are used freely with a CC0 license or credited to SVG Repo under the MIT License. All data is taken from the <a href="https://orthocal.info/">orthocal.info</a> API - most of what my code does is just make it look pretty! 
                If you encounter any errors, <a href="mailto:meatandright@gmail.com">please let me know via email</a>, 
                and I'll do my best to fix it.</p>
            </div>
        </div>
      </div>
    );
  }
}

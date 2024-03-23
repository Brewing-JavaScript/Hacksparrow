import React, { useState, useEffect, useContext } from 'react';
import api from '../Api/Api';
import { useParams } from 'react-router-dom';
import { UrlContext, UiContext } from '../App';



const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    let { currentUrl, setCurrentUrl } = useContext(UrlContext)
    let {ui} = useContext(UiContext);

    useEffect(() => {
        document.getElementById('root').style.backgroundColor = ui.backgroundColor;
        document.getElementById('root').style.color = ui.textColor;
    })

    useEffect(() => {
        console.log(currentUrl);
        const fetchArticle = async () => {
            try {
                if (currentUrl) {
                    const response = await api.post('/detail-news', { currentUrl });
                    setArticle(response.data.article);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [currentUrl]); // Dependency array with currentUrl

    if (!article) {
        return <div>Loading...</div>;
    }
    return (

        <div className="article-container">
            <div className="news-page">
                <h1>Article Details</h1>
                {article ? (
                    <div>
                        <h2>{article.title}</h2>
                        <p>{article.byline}</p>
                        <p>Published Time: {new Date(article.publishedTime).toLocaleString()}</p>
                        <img src={article.image} alt="Article" />
                        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        <p>Length: {article.length} words</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ArticleDetail;


// "content" =
//     "<div id=\"readability-page-1\" class=\"page\"><div data-vars-storyid=\"101711038557824\" id=\"dataHolder\" data-title=\"Cricket: Cricket Match Today, Cricket Live Match Score, Read Latest Cricket News\" data-url=\"/cricket\" data-story-id=\"101711038557824\" data-story-section=\"cricket\" data-story-subsection=\"\">   <div> <p> Mar 21, 2024 10:16 PM IST </p>   </div> <h2>In 2022, MSD decided to relinquish captaincy and let Ravindra Jadeja take charge. After only two wins in eight games, Jadeja stepped down</h2>  <div> <div dataid=\"/cricket/as-ms-dhoni-passes-the-baton-again-csk-say-they-are-better-prepared-101711038557824.html\"> <div> <p>MS Dhoni must have thought through his decision to hand over the Chennai Super Kings (CSK) captaincy to Ruturaj Gaikwad for many days, if not weeks or months. In trademark Dhoni style though, it was only on Thursday — the eve of the opening IPL game against Royal Challengers Bengaluru (RCB) at the MA Chidambaram Stadium in Chennai — that he let it out to the wider world via a short press release by the franchise.</p> <figure> <span> <picture> <source media=\"(max-width:767px)\" srcset=\"https://www.hindustantimes.com/ht-img/img/2024/03/21/400x225/PTI03-21-2024-000235A-0_1711038614130_1711039353258.jpg\" alt=\"Dhoni, 42, has a habit of taking these big calls without giving away much. (PTI)\" title=\"Dhoni, 42, has a habit of taking these big calls without giving away much. (PTI)\"> <img src=\"https://www.hindustantimes.com/ht-img/img/2024/03/21/550x309/PTI03-21-2024-000235A-0_1711038614130_1711039353258.jpg\" alt=\"Dhoni, 42, has a habit of taking these big calls without giving away much. (PTI)\" title=\"Dhoni, 42, has a habit of taking these big calls without giving away much. (PTI)\"> </picture> </span> <figcaption>Dhoni, 42, has a habit of taking these big calls without giving away much. (PTI)</figcaption> </figure> </div> <p>Dhoni, 42, has a habit of taking these big calls without giving away much. Sample his Test exit in Melbourne in 2014, which again came through a BCCI release shortly after a media interaction at the end of a drawn Test where he remained tight-lipped about his intentions. The retirement from limited-overs cricket for India — in 2020 — also came without any emotional speeches or teary-eyed farewells, a social media post that read “from 1929 hrs consider me as Retired” marking the end of a decorated international career.</p> <p>Hindustan Times - your fastest source for breaking news! <a onclick=\"dataLayer.push({'event':'article_inline_clicked','position':'article_middle','cta_text':'Hindustan Times - your fastest source for breaking news!','page_type':pageTYPE,'current_url':'/cricket/as-ms-dhoni-passes-the-baton-again-csk-say-they-are-better-prepared-101711038557824.html','click_url': 'https://www.hindustantimes.com/india-news','section':'cricket'});\" href=\"https://www.hindustantimes.com/india-news\"> Read now.</a></p> <p>Almost five years since he last played for India, Dhoni is likely to call it a day altogether after this IPL season. And the move to pass on the CSK captaincy to Gaikwad is a sign of that, as is the long mane that he’s growing in a throwback to his early days in the spotlight.</p> <p>It goes without saying that Gaikwad has big boots to fill, for Dhoni is undoubtedly among the finest captains to have graced the limited-overs game. His legacy as CSK leader is unlikely to ever be matched, having won five IPL titles in an extremely successful tenure that began in 2008. CSK have won 130 of the 220 matches that Dhoni has led them in.</p> <p>This is not Dhoni’s first attempt at bringing about a leadership transition at CSK. In 2022, he decided to relinquish captaincy and let star all-rounder Ravindra Jadeja take charge. The franchise, however, won only two of their first eight games, resulting in Jadeja stepping down and Dhoni taking back the captaincy as CSK finished a lowly ninth.</p> <p>If Gaikwad is the chosen man this time, it’s because he has established his credentials as an opening batter for the past four seasons. And given that he’s 27, CSK will be able to build their team around him when a mega auction takes place in 2025.</p> <p>In a pre-match interaction on Thursday, CSK coach Stephen Fleming revealed that this was solely Dhoni’s decision. “It was MS with a lot of consideration, with one view to the future on the back of a good season last year. The timing was good. Behind the scenes, Ruturaj and others have been on a captaincy grooming process. The opportunity has come up. MS is the best judge and he felt the timing is right,” the New Zealander said.</p> <p>Fleming, who has been CSK coach since 2009, admitted that they weren’t well prepared for a transition when Jadeja became captain in 2022. “The big thing with a couple of years ago is we probably were not ready for MS to move aside,” the 50-year-old conceded. “What that did was shake us as a leadership group into looking at the possibility of when he does go. Up until that stage, it was almost unthinkable. We have worked pretty hard on making sure that any mistakes that were made then aren't made again.”</p> <p>Asked whether Dhoni will play on-field mentor to Gaikwad, Fleming said: “Yeah, hope so. It's about getting that balance right without interfering but also providing the leadership that he can't ignore. He (Dhoni) is too big a presence that you can't just turn that off.”</p> <p>While Dhoni’s leadership attributes have compensated for a dip in his personal returns over the past few seasons, CSK will hope that his skills with the bat come to the fore this year. He was hampered by a knee injury last season and slotted himself mostly at No.7 or 8 as a result, but having undergone surgery in June, he will hope to unfurl those big hits and win more matches off his bat.</p> <p>“I am expecting MS to play and play well,” Fleming said. “The indications from his pre-season are that he is going really well. His body is a lot better and stronger than last year. From what I can see, his desire to contribute and do well is as high as ever, which is great for us. He is hitting the ball beautifully in the nets.”</p>  </div>     <div> <!-- Use this class for Single Author .single-author --> <ul id=\"container\"> <li> <span> ABOUT THE AUTHOR </span> <div> <figure> <a href=\"https://sportstar.thehindu.com/author/vivek-krishnan-101634903756799\" onclick=\"ga('set', 'dimension53', 'cricket');trackSnowPlow({'id':'101634903756799','index':'0','url':'https://www.hindustantimes.com/author/vivek-krishnan-101634903756799','linkValue':'https://htcms-prod-images.s3.ap-south-1.amazonaws.com/ht/rf/image_size_90x90/HT/Web/AuthorsAndColumnists/Pictures/Crop/vivek.jpeg','widgetName':'about_authors','gaEventName':'about_authors','gaEventValue':'1'});commonGA4Tracking('author_widget_click','About The Author')\"> <img data-src=\"https://htcms-prod-images.s3.ap-south-1.amazonaws.com/ht/rf/image_size_90x90/HT/Web/AuthorsAndColumnists/Pictures/Crop/vivek.jpeg\" src=\"https://htcms-prod-images.s3.ap-south-1.amazonaws.com/ht/rf/image_size_90x90/HT/Web/AuthorsAndColumnists/Pictures/Crop/vivek.jpeg\" alt=\"author-default-90x90\"> </a> </figure>  <p id=\"101634903756799\" slugname=\"vivek-krishnan\" userobj=\"{'id':'101634903756799','index':'0','url':'https://www.hindustantimes.com/author/vivek-krishnan-101634903756799','widgetName':'about_authors','gaEventName':'about_authors','gaEventValue':'1'}\" data-section=\"cricket\"> <span>Vivek Krishnan is a sports journalist who enjoys covering cricket and football among other disciplines. He wanted to be a cricketer himself but has gladly settled for watching and writing on different sports.</span>  </p> </div> </li> </ul> </div>   </div>     </div></div>",

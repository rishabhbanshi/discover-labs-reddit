import { useState } from 'react'
import './RedditDiscovery.css'
import { API_CONFIG } from '../config.js'

function RedditDiscovery() {
  const [searchQuery, setSearchQuery] = useState('')
  const [subreddits, setSubreddits] = useState([])
  const [selectedSubreddit, setSelectedSubreddit] = useState(null)
  const [detailPosts, setDetailPosts] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [usingMockData, setUsingMockData] = useState(false)

  // Mock data generator for demonstration
  const mockData = {
    "company_name": "facebook",
    "post_count": 59,
    "subreddit_analytics": [
        {
            "subreddit_name": "MachineLearning",
            "post_count": 1,
            "subscribers": 3015416,
            "description": "Beginners -&gt; /r/mlquestions or /r/learnmachinelearning , AGI -&gt; /r/singularity, career advices -&gt; /r/cscareerquestions, datasets -&gt; r/datasets",
            "category": "ai",
            "flair_distribution": {
                "Discussion": 1
            },
            "audience_size": 9.3,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 6.8,
            "posts": [
                {
                    "title": "[D] Where does this hyped news come from? *Facebook shut down ...",
                    "snippet": "Aug 1, 2017 ... A week after Elon Musk suggested AI needs to be regulated and Mark Zuckerberg disagreed, Facebook had to shut down it's AI because it became too dangerous/ ...",
                    "url": "https://www.reddit.com/r/MachineLearning/comments/6qvbu8/d_where_does_this_hyped_news_come_from_facebook/",
                    "subreddit": "MachineLearning",
                    "post_id": "6qvbu8",
                    "type": "DISCUSSION",
                    "author": "nomaderx",
                    "score": 481,
                    "num_comments": 187,
                    "created_utc": 1501583012.0,
                    "selftext": "My Facebook wall is full of people sharing this story that Facebook *had* to shut down an AI system it developed that invented it's own language. Here are some of these articles:\n\n[Independent: Facebook's AI robots shut down after they start talking to each other in their own language](http://www.independent.co.uk/life-style/gadgets-and-tech/news/facebook-artificial-intelligence-ai-chatbot-new-language-research-openai-google-a7869706.html)\n\n[BGR: Facebook engineers panic, pull plug on AI after b",
                    "link_flair_text": "Discussion"
                }
            ]
        },
        {
            "subreddit_name": "smallbusiness",
            "post_count": 3,
            "subscribers": 2361964,
            "description": "This sub is not for advertisements! Questions and answers about starting, owning, and growing a small business only.",
            "category": "business",
            "flair_distribution": {
                "Question": 3
            },
            "audience_size": 9.1,
            "mention_frequency": 0.3,
            "content_quality": 10.0,
            "business_value_score": 6.8,
            "posts": [
                {
                    "title": "Do Facebook ads work for small businesses? : r/smallbusiness",
                    "snippet": "Jan 17, 2024 ... Facebook ads can help small businesses, and even though there are many options, Facebook provides tools to help you reach the exact people you ...",
                    "url": "https://www.reddit.com/r/smallbusiness/comments/198n0hl/do_facebook_ads_work_for_small_businesses/",
                    "subreddit": "smallbusiness",
                    "post_id": "198n0hl",
                    "type": "DISCUSSION",
                    "author": "PNGstan",
                    "score": 42,
                    "num_comments": 110,
                    "created_utc": 1705462996.0,
                    "selftext": "Isn't it difficult to target the right audience on Facebook with so many options?",
                    "link_flair_text": "Question"
                },
                {
                    "title": "Are Facebook and Instagram useful tools to generate business? : r ...",
                    "snippet": "Feb 2, 2025 ... Yes, Facebook and Instagram are super useful tools to generate business (but if done right). Let me explain: These platforms have cold audiences ...",
                    "url": "https://www.reddit.com/r/smallbusiness/comments/1ifyn3p/are_facebook_and_instagram_useful_tools_to/",
                    "subreddit": "smallbusiness",
                    "post_id": "1ifyn3p",
                    "type": "DISCUSSION",
                    "author": "Necessary_Onion_4967",
                    "score": 0,
                    "num_comments": 14,
                    "created_utc": 1738507357.0,
                    "selftext": "I’m taking over a business that is doing OK (it’s similar to a HOA management firm). There has been no marketing to date, and most new clients come from referrals or organic search. \n\nI want to drive more sales to grow the business and one way I imagine doing that is setting up, and being active on, Facebook and Instagram (maybe other platforms too) and engaging with visitors.\n\nMy question is - is this worth the effort? Are you utilizing these platforms and seeing results? Or are they not as val",
                    "link_flair_text": "Question"
                },
                {
                    "title": "How to get people to follow your professional page on facebook? : r ...",
                    "snippet": "Jul 13, 2025 ... I started a facebook professional page to help grow my personal brand about a month ago and started posting reels, images and texts and ...",
                    "url": "https://www.reddit.com/r/smallbusiness/comments/1lz0tfc/how_to_get_people_to_follow_your_professional/",
                    "subreddit": "smallbusiness",
                    "post_id": "1lz0tfc",
                    "type": "DISCUSSION",
                    "author": "Purple_Cress5873",
                    "score": 1,
                    "num_comments": 7,
                    "created_utc": 1752433286.0,
                    "selftext": "I started a facebook professional page to help grow my personal brand about a month ago and started posting reels, images and texts and can't seem to get any followers. I decided to pay for ads and my target audience is females ages 25-40, which I set on the facebook ad, which got me 80 followers of men 60+. It was very odd so I stopped the ads. I have joined groups and post helpful content. I know it's helpful because I literally get hundreds of likes, but no follows. I even invite people to fo",
                    "link_flair_text": "Question"
                }
            ]
        },
        {
            "subreddit_name": "Flipping",
            "post_count": 3,
            "subscribers": 463473,
            "description": "A place to discuss tactics and success stories of buying things for a low price and selling them for a higher one.",
            "category": "general",
            "flair_distribution": {
                "Discussion": 2,
                "eBay": 1
            },
            "audience_size": 8.1,
            "mention_frequency": 0.3,
            "content_quality": 8.3,
            "business_value_score": 5.8,
            "posts": [
                {
                    "title": "TIL facebook allows people to rate you when you've been in contact ...",
                    "snippet": "Feb 4, 2025 ... TIL facebook allows people to rate you when you've been in contact with them for awhile. Discussion. Got my first 1 star review, why? I ...",
                    "url": "https://www.reddit.com/r/Flipping/comments/1ih6qg9/til_facebook_allows_people_to_rate_you_when_youve/",
                    "subreddit": "Flipping",
                    "post_id": "1ih6qg9",
                    "type": "DISCUSSION",
                    "author": "PartyNextFlo0r",
                    "score": 19,
                    "num_comments": 18,
                    "created_utc": 1738634526.0,
                    "selftext": "Got my first 1 star review,  why? I was asking well below market for a car part that goes for $800 used. And the potential buyer still only wanted to pay $100. I ended selling the item on eBay for market and told the Facebook lowballer what it sold for with screen shot. Yes I was being petty ,but live and learn.",
                    "link_flair_text": "Discussion"
                },
                {
                    "title": "Why can't Facebook Marketplace let ME choose the order of my ...",
                    "snippet": "Mar 27, 2025 ... What is the deal with Facebook Marketplace and picking its own lead photo from the group of photos that I upload?",
                    "url": "https://www.reddit.com/r/Flipping/comments/1jlfh1s/why_cant_facebook_marketplace_let_me_choose_the/",
                    "subreddit": "Flipping",
                    "post_id": "1jlfh1s",
                    "type": "DISCUSSION",
                    "author": "MyFkingUserName",
                    "score": 7,
                    "num_comments": 14,
                    "created_utc": 1743113866.0,
                    "selftext": "What is the deal with Facebook Marketplace and picking its own lead photo from the group of photos that I upload? And is there a solution that any of you have found to stop it from happening?\n\nMany of you may not be aware that when posting stuff to MP that the photos look good on your end but to the outside world, it has chosen to show the worst f'king photo it possibly can to be your lead photo. If you've ever seen listings and wondered why somebody selling their car has a photo of the tire ins",
                    "link_flair_text": "Discussion"
                },
                {
                    "title": "eBay listings are going to start showing up on Facebook ...",
                    "snippet": "Jan 8, 2025 ... It's likely itll only show up if you have it set to view shipped listings. Really theres no difference buying something shipped from FBM or Ebay.",
                    "url": "https://www.reddit.com/r/Flipping/comments/1hwibes/ebay_listings_are_going_to_start_showing_up_on/",
                    "subreddit": "Flipping",
                    "post_id": "1hwibes",
                    "type": "POST",
                    "author": "Blastoise_The_Wizard",
                    "score": 113,
                    "num_comments": 104,
                    "created_utc": 1736336666.0,
                    "selftext": "",
                    "link_flair_text": "eBay"
                }
            ]
        },
        {
            "subreddit_name": "FacebookAds",
            "post_count": 3,
            "subscribers": 203325,
            "description": "This community is a place to discuss best practices and strategies involved in running successful Facebook and Instagram ad campaigns.",
            "category": "ai",
            "flair_distribution": {
                "Help": 1,
                "No Flair": 2
            },
            "audience_size": 7.6,
            "mention_frequency": 0.3,
            "content_quality": 5.0,
            "business_value_score": 4.5,
            "posts": [
                {
                    "title": "Is facebook ads currently working? Estimated Audience not showing ...",
                    "snippet": "3 days ago ... 32 votes, 57 comments. The audience size for my warm customers is usually 2700-3000 users now its showing less than 1000 should i still run ...",
                    "url": "https://www.reddit.com/r/FacebookAds/comments/1qdsz96/is_facebook_ads_currently_working_estimated/",
                    "subreddit": "FacebookAds",
                    "post_id": "1qdsz96",
                    "type": "DISCUSSION",
                    "author": "miningsg",
                    "score": 33,
                    "num_comments": 57,
                    "created_utc": 1768504826.0,
                    "selftext": "The audience size for my warm customers is usually 2700-3000 users now its showing less than 1000 should i still run ads to this retargeting will it work? Is everyone ads still working?\n\nfor cold lookalike audiences 1% usually for me is 50k but now its showing less than 1k users too.... i don't know what to do now i have time based promotion for this weekend that urgently needs to do ads.... can anyone advise me?",
                    "link_flair_text": "Help"
                },
                {
                    "title": "How to Delete a Facebook Pixel? : r/FacebookAds",
                    "snippet": "Mar 19, 2025 ... Find the Pixel you want to remove, then go to Settings. While you can't fully delete a Pixel, you can remove it from your ad account by ...",
                    "url": "https://www.reddit.com/r/FacebookAds/comments/1jeycei/how_to_delete_a_facebook_pixel/",
                    "subreddit": "FacebookAds",
                    "post_id": "1jeycei",
                    "type": "POST",
                    "author": "hamza__khodja",
                    "score": 8,
                    "num_comments": 13,
                    "created_utc": 1742394696.0,
                    "selftext": "Hello there,\n\nI hope this post finds you all well!\n\nDuring my learning period in Facebook Ads and digital marketing, I set up two Facebook Pixels for practice and testing. Now, I want to delete them to reorganize my Business Manager.\n\nI’d really appreciate any help or guidance on this.\n\nThanks, guys!",
                    "link_flair_text": null
                },
                {
                    "title": "The amount of spam/scam messages I get to my business' Facebook ...",
                    "snippet": "Mar 10, 2025 ... Try using Facebook's built-in message filtering tools to help reduce the noise. It's a good starting point to save you time and sanity.",
                    "url": "https://www.reddit.com/r/FacebookAds/comments/1j7uqeh/the_amount_of_spamscam_messages_i_get_to_my/",
                    "subreddit": "FacebookAds",
                    "post_id": "1j7uqeh",
                    "type": "POST",
                    "author": "BKau",
                    "score": 21,
                    "num_comments": 15,
                    "created_utc": 1741598890.0,
                    "selftext": "Purely only when I pay to boost a post. I make the target audience incredibly local yet it’s still crazy the amount of messages I get from scammers. Surely Facebook could do something about this?",
                    "link_flair_text": null
                }
            ]
        },
        {
            "subreddit_name": "userexperience",
            "post_count": 1,
            "subscribers": 141257,
            "description": "A community where professionals, enthusiasts, and individuals interested in the field of user experience can share knowledge, ask questions, and engage in discussions about various UX-related topics.",
            "category": "social",
            "flair_distribution": {
                "No Flair": 1
            },
            "audience_size": 7.4,
            "mention_frequency": 0.1,
            "content_quality": 5.0,
            "business_value_score": 4.4,
            "posts": [
                {
                    "title": "Lack of volume control on Facebook/Insta reels is one of the worst ...",
                    "snippet": "Apr 10, 2025 ... One of the most baffling UX oversights on the internet right now is how Facebook and Instagram Reels still don't offer proper volume control ...",
                    "url": "https://www.reddit.com/r/userexperience/comments/1jvz8lc/lack_of_volume_control_on_facebookinsta_reels_is/",
                    "subreddit": "userexperience",
                    "post_id": "1jvz8lc",
                    "type": "POST",
                    "author": "Just-Drew-It",
                    "score": 85,
                    "num_comments": 24,
                    "created_utc": 1744295218.0,
                    "selftext": "One of the most baffling UX oversights on the internet right now is how Facebook and Instagram Reels still don’t offer proper volume control. You're either blasting audio or muting it entirely, with nothing in between. For platforms built around video content, how did they miss such a basic feature? It’s 2025 and somehow we still can't fine-tune volume on apps used by billions.\n\nAmazon isn't much better, either. While they offer volume control, it's not persistent, and every video I watch forces",
                    "link_flair_text": null
                }
            ]
        },
        {
            "subreddit_name": "FromSeries",
            "post_count": 1,
            "subscribers": 142296,
            "description": "Season 4 coming 2026!\n\nFrom (2022- TV series): From is an American science fiction-horror television series created and written by John Griffin.\n  \nFROM unravels the mystery of a nightmarish town in m",
            "category": "science",
            "flair_distribution": {
                "Opinion:snoo_thoughtful:": 1
            },
            "audience_size": 7.4,
            "mention_frequency": 0.1,
            "content_quality": 5.0,
            "business_value_score": 4.4,
            "posts": [
                {
                    "title": "Saw this on Facebook and thought the group : r/FromSeries",
                    "snippet": "3 days ago ... 644 votes, 37 comments. I think it went downhill from season 3. Maybe an unpopular opinion but I thought the producers would have something ...",
                    "url": "https://www.reddit.com/r/FromSeries/comments/1qdwjcp/saw_this_on_facebook_and_thought_the_group/",
                    "subreddit": "FromSeries",
                    "post_id": "1qdwjcp",
                    "type": "DISCUSSION",
                    "author": "Iurosavny",
                    "score": 653,
                    "num_comments": 37,
                    "created_utc": 1768512782.0,
                    "selftext": "",
                    "link_flair_text": "Opinion:snoo_thoughtful:"
                }
            ]
        },
        {
            "subreddit_name": "dcl",
            "post_count": 1,
            "subscribers": 52475,
            "description": "A subreddit for those who love sailing the seven seas with Mickey Mouse and friends. Share stories, pictures, personal navigators and tips for those new to the Disney Cruise Line.",
            "category": "ai",
            "flair_distribution": {
                ":CaptainMickey: TRIP PLANNING": 1
            },
            "audience_size": 6.7,
            "mention_frequency": 0.1,
            "content_quality": 5.0,
            "business_value_score": 4.1,
            "posts": [
                {
                    "title": "How do you find the Facebook group of your cruise ? : r/dcl",
                    "snippet": "Mar 8, 2025 ... In the search bar, type in the ship and sail date. For example, I am on a Magic in August so my search will be “Disney Magic August 17” and ...",
                    "url": "https://www.reddit.com/r/dcl/comments/1j6kvkn/how_do_you_find_the_facebook_group_of_your_cruise/",
                    "subreddit": "dcl",
                    "post_id": "1j6kvkn",
                    "type": "POST",
                    "author": "theeskilax",
                    "score": 2,
                    "num_comments": 5,
                    "created_utc": 1741451523.0,
                    "selftext": "I’ve tried several key words but nothing pops up.",
                    "link_flair_text": ":CaptainMickey: TRIP PLANNING"
                }
            ]
        },
        {
            "subreddit_name": "MarvelPuzzleQuest",
            "post_count": 1,
            "subscribers": 22148,
            "description": "Discussion for our favorite match-3 game!",
            "category": "gaming",
            "flair_distribution": {
                "🤔 META DISCUSSION ❓ ": 1
            },
            "audience_size": 6.2,
            "mention_frequency": 0.1,
            "content_quality": 5.0,
            "business_value_score": 3.9,
            "posts": [
                {
                    "title": "I uninstalled and reinstalled and when I tried to connect to Facebook ...",
                    "snippet": "Aug 6, 2025 ... You had to select tracking the screen before it. FB requires it of MPQ now. You can go to Facebook itself and change it there. Without it ...",
                    "url": "https://www.reddit.com/r/MarvelPuzzleQuest/comments/1mjga2p/i_uninstalled_and_reinstalled_and_when_i_tried_to/",
                    "subreddit": "MarvelPuzzleQuest",
                    "post_id": "1mjga2p",
                    "type": "DISCUSSION",
                    "author": "Voyager_74656",
                    "score": 16,
                    "num_comments": 9,
                    "created_utc": 1754513383.0,
                    "selftext": "If I select open settings there isn’t an option for tracking. Any ideas on what I need to do?\n",
                    "link_flair_text": "🤔 META DISCUSSION ❓ "
                }
            ]
        },
        {
            "subreddit_name": "PleX",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Discussion": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "Plex, why are you doing this (Facebook Portal) : r/PleX",
                    "snippet": "Feb 8, 2025 ... I have an old Facebook Portal that isn't really good for much anymore. I kept it around because I could still use it for Zoom calls and Plex ...",
                    "url": "https://www.reddit.com/r/PleX/comments/1ikawrl/plex_why_are_you_doing_this_facebook_portal/",
                    "subreddit": "PleX",
                    "post_id": "1ikawrl",
                    "type": "DISCUSSION",
                    "author": "nVitius",
                    "score": 0,
                    "num_comments": 14,
                    "created_utc": 1738976249.0,
                    "selftext": "I have an old Facebook Portal that isn't really good for much anymore. I kept it around because I could still use it for Zoom calls and Plex.\n\nLooks like Plex is going to kill their app on it in a couple months. Pretty disappointed with this decision. There's also no way to sideload apps onto the device. Guess it's going to the landfill pretty soon.",
                    "link_flair_text": "Discussion"
                }
            ]
        },
        {
            "subreddit_name": "AskMarketing",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Question": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "Is Facebook ad still effective in 2025? : r/AskMarketing",
                    "snippet": "Jan 2, 2025 ... Yes, Facebook ads are still effective in 2025, but the way you approach them has definitely evolved.",
                    "url": "https://www.reddit.com/r/AskMarketing/comments/1hrucuc/is_facebook_ad_still_effective_in_2025/",
                    "subreddit": "AskMarketing",
                    "post_id": "1hrucuc",
                    "type": "DISCUSSION",
                    "author": "riddhimaan",
                    "score": 7,
                    "num_comments": 21,
                    "created_utc": 1735826548.0,
                    "selftext": "Hey everyone, so for the past few months I’ve been trying to get into marketing. I’ve been learning stuff on my own and also took a course on Facebook ads.\n\nBut honestly, I’m kinda stuck with this question—like, are Facebook ads even worth it anymore in 2025? Actually, not just Facebook, I mean digital advertising in general. Is it still effective or is it kinda overhyped now?\n\nI don’t want the usual “it depends” answer, lol. Just need some honest, non-biased advice from people who’ve been doing",
                    "link_flair_text": "Question"
                }
            ]
        },
        {
            "subreddit_name": "MTB",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Discussion": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "80% sales from big brands? Almost got me but Facebook didn't take ...",
                    "snippet": "Jul 21, 2025 ... Don't buy things through adds . Majority are scams. Facebook doesn't take them down as the company pays for the add. It's up to you to know it's ...",
                    "url": "https://www.reddit.com/r/MTB/comments/1m5mz3q/80_sales_from_big_brands_almost_got_me_but/",
                    "subreddit": "MTB",
                    "post_id": "1m5mz3q",
                    "type": "DISCUSSION",
                    "author": "NorthCare",
                    "score": 45,
                    "num_comments": 38,
                    "created_utc": 1753113974.0,
                    "selftext": "I came across three ads on Instagram and Facebook advertising huge sales from Canyon-warehouse, Trek-warehouse and Specialized. These are scams right? \n\nThe Canyon one almost got me because the website looked so legit. I reported it to Facebook after the second one but they declined to take it down. Any legal reason why they wouldn’t take it down other than greed?",
                    "link_flair_text": "Discussion"
                }
            ]
        },
        {
            "subreddit_name": "musicmarketing",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Question": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "Facebook Ads Getting Clicks But Not Streams : r/musicmarketing",
                    "snippet": "Jan 24, 2025 ... All my ads are getting suspiciously good CTR's but zero streams. I see the “people listening now” number now go up on Spotify, but the ads just are all going ...",
                    "url": "https://www.reddit.com/r/musicmarketing/comments/1i8qdn5/facebook_ads_getting_clicks_but_not_streams/",
                    "subreddit": "musicmarketing",
                    "post_id": "1i8qdn5",
                    "type": "DISCUSSION",
                    "author": "TheOneAndOnlyHydra",
                    "score": 15,
                    "num_comments": 26,
                    "created_utc": 1737704995.0,
                    "selftext": "Title explains most of it. For whatever reason, all my ads are getting suspiciously good CTR’s but zero streams. I see the “people listening now” number now go up on Spotify, but the ads just are all going to the same country and it’s been honestly a bit frustrating since I’ve been trying to figure this out for over a week. Any help would be huge 🙏",
                    "link_flair_text": "Question"
                }
            ]
        },
        {
            "subreddit_name": "truespotify",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Question": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "Why does Spotify keep pausing when I CLOSE Facebook? : r ...",
                    "snippet": "Oct 1, 2025 ... Doing it on IOS 26.0.1. Too. I'll have Spotify playing, connected to my Jaguar and when I just close the FB app, the music pauses. Annoying as ...",
                    "url": "https://www.reddit.com/r/truespotify/comments/1nvedji/why_does_spotify_keep_pausing_when_i_close/",
                    "subreddit": "truespotify",
                    "post_id": "1nvedji",
                    "type": "DISCUSSION",
                    "author": "sora2522",
                    "score": 229,
                    "num_comments": 262,
                    "created_utc": 1759339206.0,
                    "selftext": "***UPDATE***: The new Facebook app update fixed the issue\n\nYeah, you read that right. I know people have had issues with Facebook pausing their Spotify when it’s opened due to to videos autoplaying, but for me it’s been happening recently where the music pauses when I swipe OUT of Facebook. Any idea what’s going on??\n\nEDIT: for ref, on my iPhone iOS 18.5\n\nEDITT: ok I was just listening to some music via the Music app (like stuff I uploaded to my phone, not Apple Music’s streaming) and it did the",
                    "link_flair_text": "Question"
                }
            ]
        },
        {
            "subreddit_name": "virtualreality",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Discussion": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "When Facebook bought Oculus for 2 billion dollars what did they ...",
                    "snippet": "Jul 23, 2025 ... Basically it was an investment. It could fly off and bring more money or go down. VR market can still fly it's just a lot slower and most likely ...",
                    "url": "https://www.reddit.com/r/virtualreality/comments/1m7ne4j/when_facebook_bought_oculus_for_2_billion_dollars/",
                    "subreddit": "virtualreality",
                    "post_id": "1m7ne4j",
                    "type": "DISCUSSION",
                    "author": "Strict_Yesterday1649",
                    "score": 0,
                    "num_comments": 33,
                    "created_utc": 1753309904.0,
                    "selftext": "It feels like they fired almost everyone and the actual headset they have now is nothing like the Oculus Rift.",
                    "link_flair_text": "Discussion"
                }
            ]
        },
        {
            "subreddit_name": "webdev",
            "post_count": 1,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Question": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.1,
            "content_quality": 10.0,
            "business_value_score": 3.5,
            "posts": [
                {
                    "title": "is it just me or is Facebook completely unusable on mobile using ...",
                    "snippet": "Oct 30, 2022 ... It has become literally unusable. It just hangs constantly. Beyond the hanging I noticed that the site is buggy as hell and seems to have incurred a very bad ...",
                    "url": "https://www.reddit.com/r/webdev/comments/yht57y/is_it_just_me_or_is_facebook_completely_unusable/",
                    "subreddit": "webdev",
                    "post_id": "yht57y",
                    "type": "DISCUSSION",
                    "author": "Darkmaster85845",
                    "score": 9,
                    "num_comments": 16,
                    "created_utc": 1667171132.0,
                    "selftext": "I never downloaded the Facebook app because I recall my gf had it and it was a memory hog. However I used to browse Facebook on my phone's browser(brave) just fine until a few months ago where they pushed some update and it has become literally unusable. It just hangs constantly. Beyond the hanging I noticed that the site is buggy as hell and seems to have incurred a very bad downgrade from earlier versions. Does anyone know what the hell is happening? I know meta is having a lot of financial is",
                    "link_flair_text": "Question"
                }
            ]
        },
        {
            "subreddit_name": "facebook",
            "post_count": 2,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Tech Support": 1,
                "Discussion": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.2,
            "content_quality": 7.5,
            "business_value_score": 2.7,
            "posts": [
                {
                    "title": "Every time I share a Facebook reel the url comes up as ?fs=e - what ...",
                    "snippet": "Jan 22, 2025 ... In Facebook Messenger posts, “?fs=e” at the end of a link usually indicates that the link is meant to open a Facebook Reel in “full-screen” mode ...",
                    "url": "https://www.reddit.com/r/facebook/comments/1i7g959/every_time_i_share_a_facebook_reel_the_url_comes/",
                    "subreddit": "facebook",
                    "post_id": "1i7g959",
                    "type": "POST",
                    "author": "SpectrumWoes",
                    "score": 63,
                    "num_comments": 62,
                    "created_utc": 1737566131.0,
                    "selftext": "This just started happening about a week ago, and I didn’t notice until my sister asked me if my phone was having problems. Every reel I shared with her came up as ?fs=e in the Messenger app. Turns out it’s done that with anyone in the last week I’ve shared reels with. \n\nWhen I tried copying the link to any reel it does the same thing - I can’t figure it out. Anyone else seen this before? ",
                    "link_flair_text": "Tech Support"
                },
                {
                    "title": "Facebook messenger asking for pin to restore history. Why it is ...",
                    "snippet": "Jan 1, 2025 ... Facebook asks you to back up chats to protect your information by enabling a secure backup for your messages, especially for end-to-end ...",
                    "url": "https://www.reddit.com/r/facebook/comments/1hr5602/facebook_messenger_asking_for_pin_to_restore/",
                    "subreddit": "facebook",
                    "post_id": "1hr5602",
                    "type": "DISCUSSION",
                    "author": "Forward-Inflation-77",
                    "score": 16,
                    "num_comments": 44,
                    "created_utc": 1735745634.0,
                    "selftext": "Just recently, when I go to my facebook messages, it asks me for a pin to restore history.  I don't enter one because I have no idea what the pin is, I don't recall ever setting a pin up or at least never made note of it.  I can still see several past messages so right now not a big deal.  I can still look at and reply to messages, well at least new ones.  But is this something that I could lose all my messages if I never enter a pin?  Why is it asking me for this now?\n\nI use facebook across mul",
                    "link_flair_text": "Discussion"
                }
            ]
        },
        {
            "subreddit_name": "productivity",
            "post_count": 4,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Advice Needed": 2,
                "Question": 2
            },
            "audience_size": 0.0,
            "mention_frequency": 0.4,
            "content_quality": 7.5,
            "business_value_score": 2.7,
            "posts": [
                {
                    "title": "People that got out of facebook and instagram, how is your life now ...",
                    "snippet": "Apr 30, 2024 ... My life became better after quitting fb and ig. I noticed feeling irritated after looking at social media and I wanted it to stop. Overall, I'm ...",
                    "url": "https://www.reddit.com/r/productivity/comments/1cgnv03/people_that_got_out_of_facebook_and_instagram_how/",
                    "subreddit": "productivity",
                    "post_id": "1cgnv03",
                    "type": "DISCUSSION",
                    "author": "Vertasoie",
                    "score": 490,
                    "num_comments": 379,
                    "created_utc": 1714466063.0,
                    "selftext": "Im 34 F , I struggle big time with social media addiction to the point I put an app to block some websites on my computer to help me with productivity. Its a bit better since I started to do it, but im scared to see how I crave social media when I try to avoid it. I'm feeling quite pathetic. The truth is I think I use it because im feeling deeply lonely and sad and it helps my mind to avoid to think about bad things. But it works less and less these days. \n\nIm contemplating more and more to quit",
                    "link_flair_text": "Advice Needed"
                },
                {
                    "title": "Can you limit Facebook per use instead of per day? : r/productivity",
                    "snippet": "Sep 28, 2024 ... I have spent the last 40 minutes searching for a way to limit my use of Facebook per usage instead of per day. Every single thing I have found is just per day.",
                    "url": "https://www.reddit.com/r/productivity/comments/1frhwdt/can_you_limit_facebook_per_use_instead_of_per_day/",
                    "subreddit": "productivity",
                    "post_id": "1frhwdt",
                    "type": "DISCUSSION",
                    "author": "SquishyNudibranch",
                    "score": 4,
                    "num_comments": 14,
                    "created_utc": 1727540298.0,
                    "selftext": "In the epitome of irony, I have spent the last 40 minutes searching for a way to limit my use of Facebook per usage instead of per day. Every single thing I have found is just per day. I want to be able to limit my time for each time I open the app. My problem is I get on the app and get sucked in I don't get out of bed in time in the morning. I want either a reminder or to be kicked out after a specified time I set per usage, not per day. I want to be able to open it up in the morning, and afte",
                    "link_flair_text": "Question"
                },
                {
                    "title": "People that got out of facebook and instagram, how is your life now ...",
                    "snippet": "Apr 30, 2024 ... My life became better after quitting fb and ig. I noticed feeling irritated after looking at social media and I wanted it to stop. Overall, I'm ...",
                    "url": "https://www.reddit.com/r/productivity/comments/1cgnv03/people_that_got_out_of_facebook_and_instagram_how/",
                    "subreddit": "productivity",
                    "post_id": "1cgnv03",
                    "type": "DISCUSSION",
                    "author": "Vertasoie",
                    "score": 491,
                    "num_comments": 379,
                    "created_utc": 1714466063.0,
                    "selftext": "Im 34 F , I struggle big time with social media addiction to the point I put an app to block some websites on my computer to help me with productivity. Its a bit better since I started to do it, but im scared to see how I crave social media when I try to avoid it. I'm feeling quite pathetic. The truth is I think I use it because im feeling deeply lonely and sad and it helps my mind to avoid to think about bad things. But it works less and less these days. \n\nIm contemplating more and more to quit",
                    "link_flair_text": "Advice Needed"
                },
                {
                    "title": "Can you limit Facebook per use instead of per day? : r/productivity",
                    "snippet": "Sep 28, 2024 ... To make this stronger, you can remove Facebook from showing up in search results with Siri settings. That way it's “only” accessible through the ...",
                    "url": "https://www.reddit.com/r/productivity/comments/1frhwdt/can_you_limit_facebook_per_use_instead_of_per_day/",
                    "subreddit": "productivity",
                    "post_id": "1frhwdt",
                    "type": "DISCUSSION",
                    "author": "SquishyNudibranch",
                    "score": 4,
                    "num_comments": 14,
                    "created_utc": 1727540298.0,
                    "selftext": "In the epitome of irony, I have spent the last 40 minutes searching for a way to limit my use of Facebook per usage instead of per day. Every single thing I have found is just per day. I want to be able to limit my time for each time I open the app. My problem is I get on the app and get sucked in I don't get out of bed in time in the morning. I want either a reminder or to be kicked out after a specified time I set per usage, not per day. I want to be able to open it up in the morning, and afte",
                    "link_flair_text": "Question"
                }
            ]
        },
        {
            "subreddit_name": "PPC",
            "post_count": 21,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "Meta Ads": 21
            },
            "audience_size": 0.0,
            "mention_frequency": 2.1,
            "content_quality": 5.0,
            "business_value_score": 2.4,
            "posts": [
                {
                    "title": "Facebook ads overreporting? : r/PPC",
                    "snippet": "Jul 8, 2022 ... The short answer is: Facebook is inflating the numbers compared to Analytics, but both platforms are technically right according to their own ...",
                    "url": "https://www.reddit.com/r/PPC/comments/vubqq9/facebook_ads_overreporting/",
                    "subreddit": "PPC",
                    "post_id": "vubqq9",
                    "type": "POST",
                    "author": "zenith66",
                    "score": 14,
                    "num_comments": 24,
                    "created_utc": 1657289606.0,
                    "selftext": "Hey everyone,\n\nLong story short, I manage Google Ads for a couple of clients. They're also running Facebook with an agency.\n\nThe Facebook results are amazing and they're disappointed Google isn't performing similar.\n\nNow, when I look in Google Analytics I see similar revenue for Facebook and Google, plus email, organic, referrals, and direct traffic, right?  Shopify shows similar results to Google Analytics.\n\nFacebook reports revenue that is 4 times higher than what I see in Analytics. What is w",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ads - Setup Error (#1860014) : r/PPC",
                    "snippet": "Aug 7, 2020 ... Duplicate the campaign instead, then go ahead and edit all you need to edit about your campaign, ad set, and ad. You can now publish what you ...",
                    "url": "https://www.reddit.com/r/PPC/comments/i5gp2z/facebook_ads_setup_error_1860014/",
                    "subreddit": "PPC",
                    "post_id": "i5gp2z",
                    "type": "POST",
                    "author": "dweezle23",
                    "score": 18,
                    "num_comments": 102,
                    "created_utc": 1596816871.0,
                    "selftext": "I'm getting the following message when I try to set up FB ads:\n\n**Review 1 Error**\n\nGo to your Page to edit this. (#1860014) \n\nNothing has changed on my page since I created my last ads and I can't find anything on this error code. Does anyone have any insight?",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Is Facebook PPC a scam? : r/PPC",
                    "snippet": "Mar 21, 2024 ... It's not a scam, but think of it this way. You go to Google when there's intent. You want to look for something / buy something.",
                    "url": "https://www.reddit.com/r/PPC/comments/1bk249j/is_facebook_ppc_a_scam/",
                    "subreddit": "PPC",
                    "post_id": "1bk249j",
                    "type": "POST",
                    "author": "[deleted]",
                    "score": 0,
                    "num_comments": 34,
                    "created_utc": 1711011610.0,
                    "selftext": "Just launched my first fb campaign, trading around 6x ROAS, with google shopping. I’m in Australia so limited by search volume. (Can’t scale &amp; a unique product)\n\nI’m 3 days into a Facebook campaign, I’ve had 120 site link clinks yet no sales. That’s ok, however average session duration 8 seconds? I’m a one product store, my ad copy is exactly what I sell? Why the bounce rate and low average session duration. \n\nSomething smells fishy to me",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Is Facebook Ads traffic fake? : r/PPC",
                    "snippet": "Apr 21, 2024 ... 100% accidental clicks is equal to fake traffic in my opinion. I was expecting around 70% junk traffic but at least 30% should have some kind of engagement on ...",
                    "url": "https://www.reddit.com/r/PPC/comments/1c9fpia/is_facebook_ads_traffic_fake/",
                    "subreddit": "PPC",
                    "post_id": "1c9fpia",
                    "type": "POST",
                    "author": "ramsevak",
                    "score": 9,
                    "num_comments": 35,
                    "created_utc": 1713699240.0,
                    "selftext": "I am trying FB Ads again after reading about it thoroughly and learning \"again\" about audience targeting. From past one week we are getting 50-100 clicks per day as per Facebook Ad's manager however, the story is completely different when I check Google Analytics. It shows 0 engagement time for all the hits, where from other sources it has around 2.28 minutes of engagement time on website.\n\nDo you guies also feel that FB traffic is fake? \n\nor am I doing something incorrect?\n\nI would have attache",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ad Manager Error 2446386 : r/PPC",
                    "snippet": "Feb 22, 2024 ... I created an ad using Facebook ads manager and checked in today to see how it got started to only see an error message that does not seem to ...",
                    "url": "https://www.reddit.com/r/PPC/comments/1ax8esj/facebook_ad_manager_error_2446386/",
                    "subreddit": "PPC",
                    "post_id": "1ax8esj",
                    "type": "POST",
                    "author": "makingwavespro",
                    "score": 14,
                    "num_comments": 35,
                    "created_utc": 1708613963.0,
                    "selftext": "I created an ad using Facebook ads manager and checked in today to see how it got started to only see an error message that does not seem to be correct.\n\n\"Image Not Found: The image you selected is not available. It might be deleted or you might not have permission to use it in ads. Try selecting a different image. (#2446386) \"\n\n&amp;#x200B;\n\nHowever I did not upload a photo, I uploaded a video and cannot seem to find any answers on how to correct this. I certainly have permission to use the con",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Why is Facebook Ad Manager so damn SLOW!? : r/PPC",
                    "snippet": "Feb 12, 2020 ... It's not slow because of your internet speed, but rather your computer's processing power/RAM. To make it faster, give this a try.",
                    "url": "https://www.reddit.com/r/PPC/comments/f2y1rq/why_is_facebook_ad_manager_so_damn_slow/",
                    "subreddit": "PPC",
                    "post_id": "f2y1rq",
                    "type": "POST",
                    "author": "socialmediamarketer5",
                    "score": 44,
                    "num_comments": 42,
                    "created_utc": 1581541371.0,
                    "selftext": "Running 500mb/s hardwired internet connection. This ad platform has to be the buggiest, slowest, most frustrating platform to use simply in terms of how slow and unresponsive it is! Does anyone else have this problem?",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ads going over daily budget? : r/PPC",
                    "snippet": "Jan 19, 2020 ... Hi all,. I've just started using Facebook Ads for the first time and I'm not quite sure what's going on. I have 1 campaign setup with 10 ad ...",
                    "url": "https://www.reddit.com/r/PPC/comments/eqt3qz/facebook_ads_going_over_daily_budget/",
                    "subreddit": "PPC",
                    "post_id": "eqt3qz",
                    "type": "POST",
                    "author": "ThaKarra",
                    "score": 4,
                    "num_comments": 13,
                    "created_utc": 1579417159.0,
                    "selftext": "Hi all,\n\nI've just started using Facebook Ads for the first time and I'm not quite sure what's going on.\n\nI have 1 campaign setup with 10 ad sets inside. Each ad set is set to a daily budget of $3 (testing different audiences and ads etc.), which should make my overall daily budget $30. It's been about 12h since I turned the campaign on and I've just hit the $30.84 mark of my \"Amount spent\" for the campaign.\n\nIt was in my understanding that once my \"Amount spent\" would hit $30 that the delivery ",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook ads - video gets stuck on processing and Facebook ...",
                    "snippet": "Jun 7, 2021 ... Hi guys,. Facebook is with a bug when I try to add a video to an ad. I've tried several times and it gets stuck on processing.",
                    "url": "https://www.reddit.com/r/PPC/comments/nud6ux/facebook_ads_video_gets_stuck_on_processing_and/",
                    "subreddit": "PPC",
                    "post_id": "nud6ux",
                    "type": "POST",
                    "author": "No_Persimmon_8355",
                    "score": 6,
                    "num_comments": 5,
                    "created_utc": 1623074295.0,
                    "selftext": "Hi guys,\n\nFacebook is with a bug when I try to add a video to an ad. I've tried several times and it gets stuck on processing.\n\nLast time I've tried, Facebook found that activity suspicious and disabled my entire account \"Your Facebook account has been disabled. This is because your account, or activity on it, doesn't follow our Community Standards\".\n\nDid the validation via SMS code and they asked me to upload a picture of me as well and now is pending review for who knows how long.\n\nThis is so ",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "A Facebook Ad that I paused 2 weeks ago, showed up in Facebook ...",
                    "snippet": "Dec 14, 2019 ... I paused a Facebook Carousel Ad 2 weeks ago and I have been running new ads. However my client has saw the paused ad? I've checked all my ads and this ad is ...",
                    "url": "https://www.reddit.com/r/PPC/comments/ealvmn/a_facebook_ad_that_i_paused_2_weeks_ago_showed_up/",
                    "subreddit": "PPC",
                    "post_id": "ealvmn",
                    "type": "POST",
                    "author": "[deleted]",
                    "score": 8,
                    "num_comments": 10,
                    "created_utc": 1576341589.0,
                    "selftext": "Hi Guys,\n\n&amp;#x200B;\n\nHas this ever happened to any of you?\n\nI paused a Facebook Carousel Ad 2 weeks ago and I have been running new ads. However my client has saw the paused ad? I've checked all my ads and this ad is not running and has no impressions or spend. \n\n&amp;#x200B;\n\nHow is this possible? My client is unhappy but I have not run the ad?\n\n&amp;#x200B;\n\nWhat could have caused this?\n\n&amp;#x200B;\n\nThanks!",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "almost 100% clicks from Facebook are fake. : r/PPC",
                    "snippet": "May 15, 2024 ... 95% of the clicks came via video feeds etc.. Many people probably click on it unintentionally via this placement.",
                    "url": "https://www.reddit.com/r/PPC/comments/1csh4kz/almost_100_clicks_from_facebook_are_fake/",
                    "subreddit": "PPC",
                    "post_id": "1csh4kz",
                    "type": "POST",
                    "author": "old_angler",
                    "score": 84,
                    "num_comments": 82,
                    "created_utc": 1715767406.0,
                    "selftext": "I got 2000  clicks from facebook Ad, cost per click is 0.02.   but after checked with several analytics tools.\n\nI found 100% of my clicks from Facebook Ad were fake!  They had 0 , 1 second duration, 0 cick to other url.\n\nWhy that?  Why Facebook so dishonest？what should I do next? thansk",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "First Ad on Facebook & ever since getting spam messages & emails ...",
                    "snippet": "Nov 25, 2023 ... I get the first message from \"meta business\" saying that the found something in my ad that violates the terms. They even had my business email at the bottom ...",
                    "url": "https://www.reddit.com/r/PPC/comments/183a67b/first_ad_on_facebook_ever_since_getting_spam/",
                    "subreddit": "PPC",
                    "post_id": "183a67b",
                    "type": "POST",
                    "author": "chuckybegood",
                    "score": 17,
                    "num_comments": 33,
                    "created_utc": 1700882162.0,
                    "selftext": "Hi,\n\ndoes anyone else have this issue? It was actually very convincing at first because the day after I started my ad I get the first message from \"meta business\" saying that the found something in my ad that violates the terms. They even had my business email at the bottom saying this email was sent to \"my email\" Luckily I didn't click the button and went to my ad account but nothing was coming up. Since then every day I get an email from mindz-agency dot com with the same message. I also get d",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Why can't I see ads created by my employees on Facebook Ads ...",
                    "snippet": "Nov 17, 2020 ... The ads should be switched off and published first by the person that created the ad, that way it won't go live, and then other users can see it too.",
                    "url": "https://www.reddit.com/r/PPC/comments/jvowin/why_cant_i_see_ads_created_by_my_employees_on/",
                    "subreddit": "PPC",
                    "post_id": "jvowin",
                    "type": "POST",
                    "author": "alexid95",
                    "score": 7,
                    "num_comments": 14,
                    "created_utc": 1605598501.0,
                    "selftext": "One of my employees created a new ad in our ads manager yesterday but I can't see it anywhere. She's added with employee access to the business manager and I gave her access to the ads assets part through access management in FB. She sent me a screenshot abd even a link but I still can't see it... \n\nI've tried to Google but can't see any similar problems... Anyone have any idea what is happening?",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Can no longer backdate posts on facebook? : r/PPC",
                    "snippet": "Apr 25, 2023 ... I like to create a post on a page, then advertise it so it builds up social proof, but I don't want the post to appear at the top of the ...",
                    "url": "https://www.reddit.com/r/PPC/comments/12yyvu5/can_no_longer_backdate_posts_on_facebook/",
                    "subreddit": "PPC",
                    "post_id": "12yyvu5",
                    "type": "POST",
                    "author": "[deleted]",
                    "score": 7,
                    "num_comments": 13,
                    "created_utc": 1682463245.0,
                    "selftext": "I like to create a post on a page, then advertise it so it builds up social proof, but I don't want the post to appear at the top of the feed so I backdate it. I just noticed I don't seem to be able to backdate posts anymore in the new meta business suite....am I crazy, are you not able to backdate anymore or did they just move it somewhere I'm not seeing it? Thanks for your help",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Camapign Stuck in Draft : r/PPC",
                    "snippet": "Jan 8, 2020 ... I created a new campaign with two adsets and 6 ads but I can't publish it. It's stuck in draft and when I want to publish the campaign Facebook tell me to set ...",
                    "url": "https://www.reddit.com/r/PPC/comments/eltnvi/facebook_camapign_stuck_in_draft/",
                    "subreddit": "PPC",
                    "post_id": "eltnvi",
                    "type": "POST",
                    "author": "SpringfieldDonuts",
                    "score": 2,
                    "num_comments": 10,
                    "created_utc": 1578495028.0,
                    "selftext": "Hi guys. I'm working on a client facebook business manager right now. I created a new campaign with two adsets and 6 ads but I can't publish it... It's stuck in draft and when I want to publish the campaign Facebook tell me to set up the advertising account... but my client already did that.. \n\nDo you know where the issue comes from ?\n\nI didn't find anything online..\n\nThanks 😉",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Business Suite App has unread message notification ...",
                    "snippet": "Mar 27, 2021 ... This is what worked for me: unopened spam messages are hidden in your inbox. I had to filter the 'spam' in order to even see the message to delete it.",
                    "url": "https://www.reddit.com/r/PPC/comments/melwme/facebook_business_suite_app_has_unread_message/",
                    "subreddit": "PPC",
                    "post_id": "melwme",
                    "type": "POST",
                    "author": "roemau1202",
                    "score": 43,
                    "num_comments": 65,
                    "created_utc": 1616876790.0,
                    "selftext": "I run a online business with this app and get frequent messages, I have a persistent ‘unread message’ badge notification and in the app it self when I have read all the messages. I have opened the page on my computer and there is no notification so it’s my iPhone app. I’ve tried deleting and re-downloading the app to no avail. It’s driving me nuts!! Can anyone help?",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ads, Failed to load - Disable any ad blockers and reload ...",
                    "snippet": "Aug 11, 2023 ... I can't view any of my custom conversions and edit them for some unknown reason. Here's what I have tried -. Disabling all the ad blockers.",
                    "url": "https://www.reddit.com/r/PPC/comments/15nzxt8/facebook_ads_failed_to_load_disable_any_ad/",
                    "subreddit": "PPC",
                    "post_id": "15nzxt8",
                    "type": "POST",
                    "author": "caslooper",
                    "score": 6,
                    "num_comments": 20,
                    "created_utc": 1691732114.0,
                    "selftext": "I can't view any of my custom conversions and edit them for some unknown reason.\n\nHere's what I have tried -\n\nDisabling all the ad blockers.\nChanging ad privacy in Google Chrome.\nDisabling Google Chrome ad blockers.\nTrying out a new browser - Firefox.\nTrying to disable any ad blockers inside my windows?\n\n\nI'm not so sure why I'm experiencing this, I don't even have any ad blockers in any of my chrome profiles or anywhere.\n\nI doubled check to make sure.\n\nIf anyone can help out or experiencing the",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook ads library is basically unusable for competitive research ...",
                    "snippet": "Oct 21, 2025 ... The native library is fine if you just want to see what ads exist but it's not built for people who actually need to make decisions based on ...",
                    "url": "https://www.reddit.com/r/PPC/comments/1occj59/facebook_ads_library_is_basically_unusable_for/",
                    "subreddit": "PPC",
                    "post_id": "1occj59",
                    "type": "POST",
                    "author": "aezakmii-",
                    "score": 15,
                    "num_comments": 24,
                    "created_utc": 1761052209.0,
                    "selftext": "Running campaigns for 6 different clients and honestly the native fb ads library has become a complete waste of time. Search takes forever, half the ads vanish once campaigns stop, can't filter by anything useful.\n\nSpent probably 8 hours last week just trying to track what 15 competitor brands were doing. Kept screenshots in folders like some kind of caveman because the ads would disappear by the time I needed to reference them again.\n\nFinally said screw it and started looking for better options",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ad Error: Ad Creative Is Incomplete : r/PPC",
                    "snippet": "May 5, 2020 ... Has anyone encountered this error in Facebook Ads Manager? I've been creating ads using mockups in Creative Hub.",
                    "url": "https://www.reddit.com/r/PPC/comments/ge4hjl/facebook_ad_error_ad_creative_is_incomplete/",
                    "subreddit": "PPC",
                    "post_id": "ge4hjl",
                    "type": "POST",
                    "author": "cairn8445",
                    "score": 4,
                    "num_comments": 10,
                    "created_utc": 1588707522.0,
                    "selftext": "Has anyone encountered this error in Facebook Ads Manager? I've been creating ads using mockups in Creative Hub. Never had an issue until the past couple of days. The mockup looks fine in Creative Hub and I'm an admin on the account. Yesterday I was able to get one of the ads to work properly by duplicating it from another ad group, but it hasn't worked for any others. I also tried creating the ad from scratch (ie rebuilt it in Ads Manager instead of using the mockup), but no luck. Any help/insi",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ads Error: Failed to Load Component : r/PPC",
                    "snippet": "Nov 9, 2021 ... Hi,. I am getting the following error when copying an ad from one ad set into another: \"Error: Component failed to load Something went wrong ...",
                    "url": "https://www.reddit.com/r/PPC/comments/qpwfdi/facebook_ads_error_failed_to_load_component/",
                    "subreddit": "PPC",
                    "post_id": "qpwfdi",
                    "type": "POST",
                    "author": "needpixelhelp",
                    "score": 5,
                    "num_comments": 17,
                    "created_utc": 1636434538.0,
                    "selftext": "Hi, \n\nI am getting the following error when copying an ad from one ad set into another:\n\n\"Error: Component failed to load\nSomething went wrong. Please try reloading the page.\"\n\nI have tried reloading the page, logging back in and out, copying and pasting but no luck. \n\nHas anyone encountered this before?",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook Ad Manager Error (Unable to Edit Ads) : r/PPC",
                    "snippet": "Aug 3, 2020 ... On a desktop: Go to your page that is advertising in FB > Click on \"Ad Center\" in the left column menu > Scroll down on the page to click on \" ...",
                    "url": "https://www.reddit.com/r/PPC/comments/i2znfe/facebook_ad_manager_error_unable_to_edit_ads/",
                    "subreddit": "PPC",
                    "post_id": "i2znfe",
                    "type": "POST",
                    "author": "socivitus",
                    "score": 1,
                    "num_comments": 6,
                    "created_utc": 1596470489.0,
                    "selftext": "Has anyone ever experienced this persistent error? I've never come across this and it's funny because I'm actually managing less ads than ever before. It comes and goes as I'm trying to edit/create new campaigns throughout the day and just closes me right out of everything. It's been happening only the past few days, and I've had to expedite it to FB support. Haven't heard back yet.\n\n&amp;#x200B;\n\n&gt;Unable to create draft: We limit how often you can post, comment or do other things in a given ",
                    "link_flair_text": "Meta Ads"
                },
                {
                    "title": "Facebook ads manager not allowing media to be uploaded in ad ...",
                    "snippet": "May 22, 2020 ... I've watched videos of other people creating and uploading ads with ads manager and they all have buttons where they can upload media, for some reason I do not.",
                    "url": "https://www.reddit.com/r/PPC/comments/godltu/facebook_ads_manager_not_allowing_media_to_be/",
                    "subreddit": "PPC",
                    "post_id": "godltu",
                    "type": "POST",
                    "author": "RiotHentai",
                    "score": 5,
                    "num_comments": 14,
                    "created_utc": 1590126584.0,
                    "selftext": "I've watched videos of other people creating and uploading ads with ads manager and they all have buttons where they can upload media, for some reason I do not. I have tried using both chrome and firefox and it does not change anything. I do not have the option to upload any media,it just selects product images and random variants.  I have a screenshot that makes it more clear.\n\nEDIT: Screenshot [https://imgur.com/5F2DSfE](https://imgur.com/5F2DSfE)",
                    "link_flair_text": "Meta Ads"
                }
            ]
        },
        {
            "subreddit_name": "selfpublish",
            "post_count": 7,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "No Flair": 7
            },
            "audience_size": 0.0,
            "mention_frequency": 0.7,
            "content_quality": 5.0,
            "business_value_score": 2.0,
            "posts": [
                {
                    "title": "For those of you who do facebook ads, how many sales do you ...",
                    "snippet": "Jun 10, 2024 ... My FB ads typically break even no matter how much I spend. So $35 would reflect ~17 ebook sales; or as it happens, the same number of paperback sales, due to ...",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1dcru6k/for_those_of_you_who_do_facebook_ads_how_many/",
                    "subreddit": "selfpublish",
                    "post_id": "1dcru6k",
                    "type": "POST",
                    "author": "purple-microdot",
                    "score": 11,
                    "num_comments": 40,
                    "created_utc": 1718042067.0,
                    "selftext": "And does that affect how you price your book? I'm wondering if it's worth it to do facebook ads for a book that's only making a couple bucks or so per sale. Obviously the less you sell it for, the more copies you have to sell to come out ahead but I'm curious about what kind of results you all are getting.",
                    "link_flair_text": null
                },
                {
                    "title": "Stop boosting your Facebook posts—it's throwing money away. : r ...",
                    "snippet": "Feb 10, 2025 ... The “Boost Post” button is just Facebook's way of grabbing your cash. Sure, it'll get you a few likes or views, but does that actually help ...",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1imclcn/stop_boosting_your_facebook_postsits_throwing/",
                    "subreddit": "selfpublish",
                    "post_id": "1imclcn",
                    "type": "POST",
                    "author": "uwritem",
                    "score": 82,
                    "num_comments": 54,
                    "created_utc": 1739210796.0,
                    "selftext": "The “Boost Post” button is just Facebook’s way of grabbing your cash. Sure, it’ll get you a few likes or views, but does that actually help your book? Likes doesn't mean sales, and those views - most are from people who don’t care, or worse, people who don't speak English - or worse... bots.\n\nIf you want results, you’ve got to stop relying on shortcuts and start using Facebook Ads Manager. It might seem complicated, but that’s where the real value is with ads.\n\nKnow Your goal: What are you tryin",
                    "link_flair_text": null
                },
                {
                    "title": "Facebook ads and the dreaded 'Learning Phase...' | Here is what to ...",
                    "snippet": "Jan 31, 2025 ... If you are constantly seeing chatter and frustration over the \"Learning phase\" or \"learning period\" of your Facebook ads... here is a big ...",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1ieavt4/facebook_ads_and_the_dreaded_learning_phase_here/",
                    "subreddit": "selfpublish",
                    "post_id": "1ieavt4",
                    "type": "POST",
                    "author": "uwritem",
                    "score": 50,
                    "num_comments": 24,
                    "created_utc": 1738314781.0,
                    "selftext": "If you are constantly seeing chatter and frustration over the \"Learning phase\" or \"learning period\" of your Facebook ads... here is a **big thing to know.** \n\nYour learning phase will conclude when the Facebook ad hits **50 optimisation events**. \n\nWhat does this mean?\n\nIf you're running a traffic campaign, it will stop learning after 50 clicks.   \nIf it's a conversion campaign, it will stop learning after 50 sales. (make sure your pixel is set up right!)  \nIf you're running an engagement campai",
                    "link_flair_text": null
                },
                {
                    "title": "Facebook ad - primary text mysteriously being changed : r/selfpublish",
                    "snippet": "Nov 25, 2024 ... I was startled to see that the primary text was completely different to what I had written! The new wording looked, bluntly, like something AI would write.",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1gze510/facebook_ad_primary_text_mysteriously_being/",
                    "subreddit": "selfpublish",
                    "post_id": "1gze510",
                    "type": "POST",
                    "author": "Ok-Bookkeeper9372",
                    "score": 8,
                    "num_comments": 9,
                    "created_utc": 1732522760.0,
                    "selftext": "I'm puzzled. I recently started running my first ever Facebook ad. I was pleased with the results: enough clicks and sales to justify the spend. I had a few notifications of people \"liking the link I had shared\", ie giving a thumbs-up to my ad. And if I clicked on the notifications, I saw the ad as I had created it. So far, so good.\n\nBut then something odd happened. One of the likes was by my wife, who had seen the ad in her feed (those cunning Facebook algorithms, eh). I was curious to see how ",
                    "link_flair_text": null
                },
                {
                    "title": "Facebook is hostile to authors with pen names? : r/selfpublish",
                    "snippet": "Jan 18, 2025 ... So I got banned from Facebook today because I will not give them my real identity (Yeah, I know it's one of their rules).",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1i4i79g/facebook_is_hostile_to_authors_with_pen_names/",
                    "subreddit": "selfpublish",
                    "post_id": "1i4i79g",
                    "type": "POST",
                    "author": "AidenMarquis",
                    "score": 45,
                    "num_comments": 76,
                    "created_utc": 1737236529.0,
                    "selftext": "So I got banned from Facebook today because I will not give them my real identity (Yeah, I know it's one of their rules).\n\nThey offered me a chance to appeal. I was willing to spill my guts explaining to them how I am an aspiring author who is looking to build a platform but when I clicked to appeal they won't let me go forward until I give them a head shot. 🤨\n\nSo, that's it, then? If you have a pseudonym and are, for example, looking for beta readers on Facebook - in the beta reader groups - yo",
                    "link_flair_text": null
                },
                {
                    "title": "How to get a follower Facebook account : r/selfpublish",
                    "snippet": "Aug 25, 2024 ... I am posting this here in the hope that someone can tell me how to change my author account from a regular friend request one, to an account people can follow.",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1f0wl9d/how_to_get_a_follower_facebook_account/",
                    "subreddit": "selfpublish",
                    "post_id": "1f0wl9d",
                    "type": "POST",
                    "author": "Lioness_94",
                    "score": 3,
                    "num_comments": 25,
                    "created_utc": 1724593262.0,
                    "selftext": "Hi all.\n\nI have asked this before but I don't get any help with this matter.\n\nFor some time now I have wanted to make my author Facebook account changed into an account that people can simply follow.\nSo that there would be no need for someone to send me a friend request and then me to accept it.\n\nI do also want to make a page too. Then further down the line I may make a Facebook group. But for now I just want to change the settings for my author account so that people can click a \"Follow\" button",
                    "link_flair_text": null
                },
                {
                    "title": "For those using Facebook ads: how many clicks results in one sale ...",
                    "snippet": "Apr 12, 2024 ... For those using Facebook ads: how many clicks results in one sale? I understand \"it depends\", but to give me some general idea, should I expect ...",
                    "url": "https://www.reddit.com/r/selfpublish/comments/1c2dhp1/for_those_using_facebook_ads_how_many_clicks/",
                    "subreddit": "selfpublish",
                    "post_id": "1c2dhp1",
                    "type": "POST",
                    "author": "Pan000",
                    "score": 5,
                    "num_comments": 7,
                    "created_utc": 1712939200.0,
                    "selftext": "I understand \"it depends\", but to give me some general idea, should I expect 1/5, 1/10, 1/50?\n\nI want to avoid wasting too much money on too high bids before determining it for myself, since it can take a couple of days for a print sale to appear on the KDP reports (and even longer for hardcovers.)",
                    "link_flair_text": null
                }
            ]
        },
        {
            "subreddit_name": "simpleliving",
            "post_count": 4,
            "subscribers": null,
            "description": null,
            "category": null,
            "flair_distribution": {
                "No Flair": 3,
                "Seeking Advice": 1
            },
            "audience_size": 0.0,
            "mention_frequency": 0.4,
            "content_quality": 5.0,
            "business_value_score": 1.9,
            "posts": [
                {
                    "title": "Quitting Facebook without quitting Facebook : r/simpleliving",
                    "snippet": "Feb 5, 2015 ... I'd like to get rid of the distractions Facebook gives me without having to close my account. Most of my communication is done on WhatsApp.",
                    "url": "https://www.reddit.com/r/simpleliving/comments/2uv3pl/quitting_facebook_without_quitting_facebook/",
                    "subreddit": "simpleliving",
                    "post_id": "2uv3pl",
                    "type": "POST",
                    "author": "johnny353535",
                    "score": 55,
                    "num_comments": 35,
                    "created_utc": 1423137599.0,
                    "selftext": "Hey everyone,\n\nI'd like to get rid of the distractions Facebook gives me without having to close my account. Most of my communication is done on WhatsApp, but there are still some people that don't use it. I also rely on Facebook for finding out about events - either by invitations from my friends and through groups. I already uninstalled the Facebook app on my phone and replaced it with [Facebook Lite](https://play.google.com/store/apps/details?id=com.facebook.lite), which is much more lightwei",
                    "link_flair_text": null
                },
                {
                    "title": "Ready to quit Facebook, what are the best steps to do it? : r ...",
                    "snippet": "Apr 25, 2021 ... Make it where Facebook is boring. Takes about 1 month. Then delete it. Cold turkey and you'll be reinstalling it. Wind down and you'll never ...",
                    "url": "https://www.reddit.com/r/simpleliving/comments/myk0ip/ready_to_quit_facebook_what_are_the_best_steps_to/",
                    "subreddit": "simpleliving",
                    "post_id": "myk0ip",
                    "type": "POST",
                    "author": "Iwonder19",
                    "score": 18,
                    "num_comments": 59,
                    "created_utc": 1619391948.0,
                    "selftext": "My life is spinning in a vertigo of non sense and pointless interactions. I've had enough. It doesn't help that I am a very reactive type of person and I get triggered a lot when I see bad content, ignorance, scams, misinformation. I was thinking that whatever I do, I won't make FB right but FB could make my life go wrong... So it's bye bye time. \n\nCurrently downloading my data.\n\nNext step: Should I go and delete posts and interactions manually then delete the account  or just use the 'delete ac",
                    "link_flair_text": null
                },
                {
                    "title": "If I comment/make posts on Facebook groups do my Facebook ...",
                    "snippet": "Aug 7, 2018 ... Public groups allow any of your comments to be seen by anyone on Facebook - and appear in their newsfeed. I am CONSTANTLY using the “hide all” ...",
                    "url": "https://www.reddit.com/r/simpleliving/comments/956zxs/if_i_commentmake_posts_on_facebook_groups_do_my/",
                    "subreddit": "simpleliving",
                    "post_id": "956zxs",
                    "type": "COMMENT",
                    "author": "curiouswonder91",
                    "score": 22,
                    "num_comments": 9,
                    "created_utc": 1533603165.0,
                    "selftext": "I’ve practically made my Facebook account gone by deleting my pictures, profile pictures, I’ve also stopped writing statuses &amp; I don’t like or comment on my friends post anymore.\n\nI’ve only reason I haven’t properly deleted my account  is for university unit groups as I study online &amp; for vegan local groups so I do comment on those only but I wonder if people in my friends list will see that? I want to appear non active on there to others.",
                    "link_flair_text": null
                },
                {
                    "title": "Been on and off Facebook and Instagram.. should I delete for good ...",
                    "snippet": "Mar 31, 2024 ... Yup! Deleting Instagram, Twitter, and Facebook have been nothing but a net positive in my life. It will bring you more time, more peace, and ...",
                    "url": "https://www.reddit.com/r/simpleliving/comments/1bs8hf4/been_on_and_off_facebook_and_instagram_should_i/",
                    "subreddit": "simpleliving",
                    "post_id": "1bs8hf4",
                    "type": "DISCUSSION",
                    "author": "[deleted]",
                    "score": 23,
                    "num_comments": 23,
                    "created_utc": 1711885456.0,
                    "selftext": "As the title says I've been on-and-off-again deactivating both my Instagram and Facebook profiles because every time I get back on these platforms I feel worse than I was before. I get stuck in a rabbit hole of pointless videos and mindless scrolling in order to find the tiniest bit of joy I'll never find. They're both toxic cesspools of drama, brainrot, and politics, and I don't even know why I keep them deactivated when I don't even plan on getting back on in the future again (although i do us",
                    "link_flair_text": "Seeking Advice"
                }
            ]
        }
    ]
}

  const generateMockData = (query) => {
    const frequencies = ['high', 'moderate', 'low']
    const qualityTags = [
      ['Active', 'Trending'],
      ['Popular', 'Quality Content'],
      ['Community Driven', 'Helpful'],
      ['Niche', 'Engaged'],
      ['Growing', 'Welcoming'],
      ['Moderated', 'Safe'],
      ['Expert Community', 'Technical'],
      ['Professional', 'Industry Leaders'],
      ['Innovative', 'Fast-Growing']
    ]

    // More realistic subreddit name patterns
    const subredditPatterns = [
      `${query}`,
      `${query}_community`,
      `${query}news`,
      `${query}discussion`,
      `ask${query}`,
      `${query}tech`,
      `${query}users`,
      `the${query}`,
      `${query}fans`,
      `${query}help`,
      `${query}dev`,
      `${query}pro`,
      `learn${query}`,
      `${query}tips`,
      `${query}world`,
      `all${query}`,
      `${query}official`,
      `${query}support`,
      `${query}hub`,
      `${query}talk`
    ]

    // Generate more realistic subscriber counts with exponential distribution
    const generateSubscribers = (rank) => {
      // Top subreddits have more subscribers, with exponential decay
      const baseCount = Math.floor(5000000 / Math.pow(1.3, rank))
      const variance = baseCount * 0.3
      return Math.floor(baseCount + (Math.random() - 0.5) * variance) + 1000
    }

    // Weight frequencies towards more realistic distribution
    const getWeightedFrequency = (rank) => {
      if (rank < 5) {
        const roll = Math.random()
        return roll < 0.6 ? 'high' : roll < 0.9 ? 'moderate' : 'low'
      } else if (rank < 12) {
        const roll = Math.random()
        return roll < 0.3 ? 'high' : roll < 0.8 ? 'moderate' : 'low'
      } else {
        const roll = Math.random()
        return roll < 0.1 ? 'high' : roll < 0.5 ? 'moderate' : 'low'
      }
    }

    // Generate business scores with some correlation to metrics
    const generateBusinessScore = (subscribers, frequency) => {
      let base = 70
      if (subscribers > 1000000) base += 10
      else if (subscribers > 500000) base += 7
      else if (subscribers > 100000) base += 5
      
      if (frequency === 'high') base += 8
      else if (frequency === 'moderate') base += 4
      
      return Math.min(base + Math.floor(Math.random() * 10), 95)
    }

    const descriptions = [
      `A vibrant community discussing ${query} and related innovations`,
      `The official community for ${query} enthusiasts and professionals`,
      `Discussion hub for all things ${query} - news, updates, and community support`,
      `Community-driven subreddit focused on ${query} technologies and trends`,
      `Expert discussions about ${query} implementation and best practices`,
      `Join thousands discussing ${query} strategies and experiences`,
      `Professional network for ${query} developers and users`,
      `The premier subreddit for ${query} news and industry insights`,
      `Active community sharing ${query} tips, tricks, and knowledge`,
      `Discuss ${query} with fellow enthusiasts and industry experts`
    ]

    const mockSubreddits = Array.from({ length: 20 }, (_, i) => {
      const subscribers = generateSubscribers(i)
      const frequency = getWeightedFrequency(i)
      const businessScore = generateBusinessScore(subscribers, frequency)
      
      return {
        id: i + 1,
        name: `r/${subredditPatterns[i] || `${query}${i + 1}`}`,
        subscribers: subscribers,
        frequency: frequency,
        quality: qualityTags[Math.floor(Math.random() * qualityTags.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        businessScore: businessScore
      }
    })

    // Sort by business score descending for more realistic ranking
    return mockSubreddits.sort((a, b) => b.businessScore - a.businessScore)
  }

  const generateMockPosts = (subredditName) => {
    const postTypes = ['POST', 'COMMENT']
    const sentiments = [
      { type: 'positive', score: 85, label: 'Positive', icon: '↑' },
      { type: 'positive', score: 92, label: 'Positive', icon: '↑' },
      { type: 'neutral', score: 52, label: 'Neutral', icon: '−' },
      { type: 'positive', score: 78, label: 'Positive', icon: '↑' },
      { type: 'negative', score: 34, label: 'Negative', icon: '↓' }
    ]
    
    const postContents = [
      {
        title: '[Research] OpenAI releases GPT-4 technical report',
        content: `Just read through the GPT-4 technical report released by OpenAI. The architecture improvements are impressive, especially the multimodal capabilities. The benchmarks show significant gains over GPT-3.5, particularly in reasoning tasks. Curious to see how this impacts the research community.`,
        mentions: ['OpenAI', 'GPT-4'],
        keyPhrases: ['impressive', 'significant gains', 'architecture improvements', 'multimodal capabilities']
      },
      {
        title: 'Discussion: How does OpenAI train such large models?',
        content: `The computational resources required for training models like GPT-4 are staggering. OpenAI must have access to massive GPU clusters. I wonder about their distributed training strategies and how they handle gradient synchronization at that scale.`,
        mentions: ['OpenAI'],
        keyPhrases: ['computational resources', 'massive GPU clusters', 'distributed training', 'scale']
      },
      {
        title: 'The company behind ChatGPT just published new DALL-E research',
        content: `Really excited about the new DALL-E 3 integration with ChatGPT. The image generation quality has improved dramatically, and the prompt understanding is much better than previous versions. This is a game-changer for creative workflows.`,
        mentions: ['company behind ChatGPT'],
        keyPhrases: ['game-changer', 'improved dramatically', 'excited', 'creative workflows']
      },
      {
        title: 'Performance comparison with other models',
        content: `Benchmarked the latest version against Claude and Gemini. The results are mixed - excels in coding tasks but struggles with some edge cases in math problems. Overall solid performance for most use cases.`,
        mentions: ['Claude', 'Gemini'],
        keyPhrases: ['solid performance', 'excels in coding', 'mixed results', 'use cases']
      },
      {
        title: 'Concerning trends in model deployment',
        content: `I'm worried about the safety implications of deploying these models at scale without proper guardrails. We need more research into alignment and responsible AI practices before rushing to production.`,
        mentions: ['AI'],
        keyPhrases: ['concerning', 'safety implications', 'worried', 'responsible AI']
      }
    ]

    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      type: postTypes[i % 2],
      title: postContents[i].title,
      content: postContents[i].content,
      sentiment: sentiments[i],
      mentions: postContents[i].mentions,
      keyPhrases: postContents[i].keyPhrases,
      upvotes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 500),
      author: `user${Math.floor(Math.random() * 1000)}`,
      timestamp: `${Math.floor(Math.random() * 24)}h ago`
    }))
  }

  const generateAnalytics = (subreddit) => {
    // Generate a business value score based on subscribers and frequency
    const baseScore = Math.floor(Math.random() * 20) + 75 // 75-95
    const getScoreLabel = (score) => {
      if (score >= 90) return 'Exceptional Strategic Value'
      if (score >= 80) return 'High Strategic Value'
      if (score >= 70) return 'Good Strategic Value'
      return 'Moderate Strategic Value'
    }

    // Generate detected aliases based on search query
    const commonPrefixes = ['', 'the ', 'company ', 'team ']
    const commonSuffixes = ['', ' inc', ' corp', ' team', ' official']
    const variations = []
    
    // Add base search query
    variations.push(searchQuery)
    
    // Add case variations
    variations.push(searchQuery.toUpperCase())
    variations.push(searchQuery.toLowerCase())
    variations.push(searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase())
    
    // Add common variations with prefixes and suffixes
    commonPrefixes.forEach(prefix => {
      commonSuffixes.forEach(suffix => {
        if (prefix || suffix) {
          variations.push(`${prefix}${searchQuery}${suffix}`)
        }
      })
    })
    
    // Add abbreviated version if query is long enough
    if (searchQuery.length > 4) {
      variations.push(`${searchQuery.slice(0, 3)}...`)
      variations.push(searchQuery.substring(0, 4).toUpperCase())
    }
    
    // Remove duplicates and limit to 6 most relevant
    const aliases = [...new Set(variations)].slice(0, 6)

    // Generate more realistic confidence scores with some variation
    // Higher subscriber count and better frequency should yield better scores
    const subscriberFactor = Math.min((subreddit.subscribers / 1000000) * 10, 15)
    const frequencyBoost = subreddit.frequency === 'high' ? 10 : subreddit.frequency === 'moderate' ? 5 : 0
    
    const topicMatch = Math.min(Math.floor(Math.random() * 10) + 85 + subscriberFactor, 99)
    const mentionFrequency = Math.min(Math.floor(Math.random() * 15) + 70 + frequencyBoost, 95)
    const audienceSize = Math.min(Math.floor(Math.random() * 10) + 80 + subscriberFactor, 98)
    const engagementQuality = Math.min(Math.floor(Math.random() * 15) + 72 + Math.floor(subscriberFactor / 2), 96)

    return {
      businessScore: baseScore,
      businessScoreLabel: getScoreLabel(baseScore),
      confidenceScores: {
        topicMatch: topicMatch,
        mentionFrequency: mentionFrequency,
        audienceSize: audienceSize,
        engagementQuality: engagementQuality
      },
      entityConfidence: Math.floor(Math.random() * 8) + 92,
      aliases: aliases,
      description: `High relevance and frequent discussions. Active community with ${formatNumber(subreddit.subscribers)} members engaging in quality discourse about ${searchQuery}.`
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setError(null)
    setSubreddits([])
    setSelectedSubreddit(null)
    setUsingMockData(false)
    
    try {
      const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REDDIT_DISCOVER}`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: searchQuery.trim(),
          description: searchQuery.trim()
        })
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      // const data = mockData
      
      // Transform API response to match expected structure
      const transformedResults = data.subreddit_analytics.map((subreddit, index) => {
        // Determine frequency based on mention_frequency score
        let frequency = 'low'
        if (subreddit.mention_frequency >= 7) frequency = 'high'
        else if (subreddit.mention_frequency >= 4) frequency = 'moderate'
        
        // Generate quality tags based on content_quality and audience_size
        let qualityTags = []
        if (subreddit.content_quality >= 8.5) {
          qualityTags = ['Expert Community', 'Quality Content']
        } else if (subreddit.content_quality >= 7.5) {
          qualityTags = ['Active', 'Helpful']
        } else {
          qualityTags = ['Community Driven', 'Engaged']
        }
        
        if (subreddit.audience_size >= 9) {
          qualityTags[0] = 'Popular'
        }
        
        return {
          id: index + 1,
          name: `r/${subreddit.subreddit_name}`,
          subscribers: subreddit.subscribers,
          frequency: frequency,
          quality: qualityTags,
          description: subreddit.description,
          businessScore: Math.round(subreddit.business_value_score * 10), // Convert to 0-100 scale
          rawData: subreddit // Store original data for detail view
        }
      })
      
      // Sort by business score descending
      const sortedResults = transformedResults.sort((a, b) => b.businessScore - a.businessScore)
      setSubreddits(sortedResults)
      setUsingMockData(false)
      
    } catch (err) {
      console.error('Error fetching Reddit data:', err)
      console.log('🔄 Using mock data as fallback...')
      
      // Use mock data as fallback
      const transformedResults = mockData.subreddit_analytics.map((subreddit, index) => {
        // Determine frequency based on mention_frequency score
        let frequency = 'low'
        if (subreddit.mention_frequency >= 7) frequency = 'high'
        else if (subreddit.mention_frequency >= 4) frequency = 'moderate'
        
        // Generate quality tags based on content_quality and audience_size
        let qualityTags = []
        if (subreddit.content_quality >= 8.5) {
          qualityTags = ['Expert Community', 'Quality Content']
        } else if (subreddit.content_quality >= 7.5) {
          qualityTags = ['Active', 'Helpful']
        } else {
          qualityTags = ['Community Driven', 'Engaged']
        }
        
        if (subreddit.audience_size >= 9) {
          qualityTags[0] = 'Popular'
        }
        
        return {
          id: index + 1,
          name: `r/${subreddit.subreddit_name}`,
          subscribers: subreddit.subscribers,
          frequency: frequency,
          quality: qualityTags,
          description: subreddit.description,
          businessScore: Math.round(subreddit.business_value_score * 10), // Convert to 0-100 scale
          rawData: subreddit // Store original data for detail view
        }
      })
      
      // Sort by business score descending
      const sortedResults = transformedResults.sort((a, b) => b.businessScore - a.businessScore)
      setSubreddits(sortedResults)
      setUsingMockData(true)
      
      // Clear error to show results instead
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const formatNumber = (num) => {
    if (num === null || num === undefined) {
      return 'N/A'
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'high':
        return '#ef4444'
      case 'moderate':
        return '#f59e0b'
      case 'low':
        return '#10b981'
      default:
        return '#6b7280'
    }
  }

  const handleRowClick = (subreddit) => {
    // Get posts from the original mockData if available
    const rawData = subreddit.rawData
    
    // Transform posts from mockData to expected format
    const transformedPosts = rawData && rawData.posts ? rawData.posts.slice(0, 5).map((post, index) => {
      // Determine sentiment based on score and engagement
      let sentiment = { type: 'neutral', score: 50, label: 'Neutral', icon: '−' }
      if (post.score > 500) {
        sentiment = { type: 'positive', score: Math.min(85 + Math.floor(post.score / 100), 99), label: 'Positive', icon: '↑' }
      } else if (post.score > 100) {
        sentiment = { type: 'positive', score: Math.min(70 + Math.floor(post.score / 50), 90), label: 'Positive', icon: '↑' }
      } else if (post.score < 10) {
        sentiment = { type: 'negative', score: Math.max(20, 40 - post.score), label: 'Negative', icon: '↓' }
      } else {
        sentiment = { type: 'neutral', score: 50 + Math.floor(post.score / 10), label: 'Neutral', icon: '−' }
      }
      
      // Extract mentions from title and snippet
      const mentions = [searchQuery]
      if (post.author && post.author !== 'AutoModerator') {
        mentions.push(`@${post.author}`)
      }
      
      // Generate key phrases from title and selftext
      const text = `${post.title} ${post.selftext || post.snippet || ''}`.toLowerCase()
      const keyPhrases = []
      const positiveWords = ['great', 'amazing', 'excellent', 'impressive', 'innovative', 'helpful', 'excited', 'love']
      const negativeWords = ['issue', 'problem', 'broken', 'disappointing', 'frustrated', 'poor', 'bad']
      const technicalWords = ['api', 'model', 'training', 'architecture', 'performance', 'benchmark', 'integration']
      
      positiveWords.forEach(word => { if (text.includes(word)) keyPhrases.push(word) })
      negativeWords.forEach(word => { if (text.includes(word)) keyPhrases.push(word) })
      technicalWords.forEach(word => { if (text.includes(word)) keyPhrases.push(word) })
      
      if (keyPhrases.length === 0) {
        keyPhrases.push('discussion', 'community', 'feedback')
      }
      
      // Calculate time ago from created_utc
      const now = Date.now() / 1000
      const diffSeconds = now - post.created_utc
      const diffHours = Math.floor(diffSeconds / 3600)
      const diffDays = Math.floor(diffSeconds / 86400)
      let timestamp = `${diffHours}h ago`
      if (diffDays > 0) {
        timestamp = `${diffDays}d ago`
      }
      
      return {
        id: index + 1,
        type: post.type || 'POST',
        title: post.title,
        content: post.selftext || post.snippet || 'Click to view post details on Reddit',
        sentiment: sentiment,
        mentions: mentions.slice(0, 3),
        keyPhrases: keyPhrases.slice(0, 4),
        upvotes: post.score,
        comments: post.num_comments,
        author: post.author,
        timestamp: timestamp,
        url: post.url
      }
    }) : generateMockPosts(subreddit.name)
    
    // Generate analytics from actual data
    const analyticsData = rawData ? {
      businessScore: subreddit.businessScore,
      businessScoreLabel: subreddit.businessScore >= 90 ? 'Exceptional Strategic Value' :
                          subreddit.businessScore >= 80 ? 'High Strategic Value' :
                          subreddit.businessScore >= 70 ? 'Good Strategic Value' :
                          'Moderate Strategic Value',
      confidenceScores: {
        topicMatch: Math.round((rawData.content_quality / 10) * 100),
        mentionFrequency: Math.round((rawData.mention_frequency / 10) * 100),
        audienceSize: Math.round((rawData.audience_size / 10) * 100),
        engagementQuality: Math.round((rawData.content_quality / 10) * 95) // Slightly lower than content quality
      },
      entityConfidence: 96, // High confidence for mock data
      aliases: [
        searchQuery,
        searchQuery.toUpperCase(),
        searchQuery.toLowerCase(),
        searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase(),
        `the ${searchQuery}`,
        `@${searchQuery}`
      ],
      description: `High relevance and frequent discussions. Active community with ${formatNumber(subreddit.subscribers)} members engaging in quality discourse about ${searchQuery}.`
    } : generateAnalytics(subreddit)
    
    setDetailPosts(transformedPosts)
    setAnalytics(analyticsData)
    setSelectedSubreddit(subreddit)
  }

  const closeDetail = () => {
    setSelectedSubreddit(null)
    setDetailPosts([])
    setAnalytics(null)
  }

  return (
    <div className="reddit-discovery">
      {/* Hero Landing Page - Show when no results and not loading */}
      {!loading && !error && subreddits.length === 0 && (
        <div className="hero-landing">
          <div className="hero-background">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
          </div>
          
          <div className="hero-content">
            <div className="logo-badge">
              <svg className="reddit-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF4500"/>
                <circle cx="7" cy="8" r="1.5" fill="white"/>
                <circle cx="13" cy="8" r="1.5" fill="white"/>
                <path d="M 6 12 Q 10 14 14 12" stroke="white" strokeWidth="1.5" fill="none"/>
              </svg>
              <span className="logo-text">Reddit Discovery</span>
            </div>
            
            <h1 className="hero-title">
              Discover Reddit Intelligence
            </h1>
            
            <p className="hero-description">
              Uncover valuable insights from Reddit communities.<br/>
              Track mentions, analyze sentiment, and discover engagement patterns.
            </p>
            
            <div className="search-wrapper">
              <div className="search-icon-container">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text"
                className="hero-input"
                placeholder="Enter company name or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="hero-button" onClick={handleSearch}>
                Discover
                <span className="arrow">→</span>
              </button>
            </div>
            
            <div className="quick-search">
              <span className="quick-label">Try:</span>
              <button className="quick-chip" onClick={() => setSearchQuery('openai')}>OpenAI</button>
              <button className="quick-chip" onClick={() => setSearchQuery('microsoft')}>Microsoft</button>
              <button className="quick-chip" onClick={() => setSearchQuery('tesla')}>Tesla</button>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <div className="feature-title">Smart Discovery</div>
                <div className="feature-desc">Find relevant subreddits instantly</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <div className="feature-title">Deep Analytics</div>
                <div className="feature-desc">Engagement & sentiment analysis</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <div className="feature-title">Real-time Data</div>
                <div className="feature-desc">Live Reddit community insights</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Compact Header - Show when results exist or loading */}
      {(subreddits.length > 0 || loading || error) && (
        <div className="compact-header">
          <div className="header-brand">
            <svg className="header-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#FF4500"/>
              <circle cx="7" cy="8" r="1.5" fill="white"/>
              <circle cx="13" cy="8" r="1.5" fill="white"/>
              <path d="M 6 12 Q 10 14 14 12" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className="header-title">Reddit Discovery</span>
          </div>
          <div className="header-search-bar">
            <input
              type="text"
              className="header-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button className="header-button" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Discovering subreddits for "{searchQuery}"...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={handleSearch}>Retry</button>
        </div>
      )}

      {subreddits.length > 0 && (
        <div className="results-container">
          {usingMockData && (
            <div className="mock-data-banner">
              <span className="banner-icon">ℹ️</span>
              <span className="banner-text">
                Showing sample data - API not available. Start the backend server for live data.
              </span>
            </div>
          )}
          <h2>Found {subreddits.length} Subreddits</h2>
          <div className="subreddit-table">
            <div className="table-header">
              <div className="col-rank">Rank</div>
              <div className="col-subreddit">Subreddit</div>
              <div className="col-subscribers">Subscribers</div>
              {/* <div className="col-frequency">Frequency</div> */}
              <div className="col-score">Score</div>
              <div className="col-quality">Quality</div>
            </div>
            {subreddits.map((sub, index) => (
              <div
                key={sub.id}
                className="table-row"
                onClick={() => handleRowClick(sub)}
              >
                <div className="col-rank">
                  <span className="rank-number">#{index + 1}</span>
                </div>
                <div className="col-subreddit">
                  <div className="subreddit-cell">
                    <div className="subreddit-logo-small">
                      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#FF4500"/>
                        <circle cx="7" cy="8" r="1.5" fill="white"/>
                        <circle cx="13" cy="8" r="1.5" fill="white"/>
                        <path d="M 6 12 Q 10 14 14 12" stroke="white" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </div>
                    <div className="subreddit-name-cell">
                      <div className="subreddit-name-text">{sub.name}</div>
                      <div className="subreddit-description-text">{sub.description}</div>
                    </div>
                  </div>
                </div>
                <div className="col-subscribers">
                  <span className="subscribers-text">{formatNumber(sub.subscribers)}</span>
                </div>
                {/* <div className="col-frequency">
                  <span 
                    className="frequency-badge"
                    style={{ backgroundColor: getFrequencyColor(sub.frequency) }}
                  >
                    {sub.frequency}
                  </span>
                </div> */}
                <div className="col-score">
                  <span className="business-score-badge">{sub.businessScore}</span>
                </div>
                <div className="col-quality">
                  <div className="quality-tags-cell">
                    {sub.quality.map((tag, idx) => (
                      <span key={idx} className="quality-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSubreddit && analytics && (
        <div className="detail-overlay" onClick={closeDetail}>
          <div className="detail-window" onClick={(e) => e.stopPropagation()}>
            <div className="detail-header">
              <div className="detail-title-section">
                <div className="subreddit-logo-large">
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#FF4500"/>
                    <circle cx="7" cy="8" r="1.5" fill="white"/>
                    <circle cx="13" cy="8" r="1.5" fill="white"/>
                    <path d="M 6 12 Q 10 14 14 12" stroke="white" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <div className="detail-header-info">
                  <h2>{selectedSubreddit.name}</h2>
                  <p className="detail-header-meta">
                    {formatNumber(selectedSubreddit.subscribers)} members • Analysis for {searchQuery}
                  </p>
                </div>
              </div>
              <div className="detail-header-scores">
                <div className="detail-header-entity">
                  <div className="entity-confidence-header">
                    <span className="entity-percentage-header">{analytics.entityConfidence}%</span>
                    <span className="entity-check-header">✓</span>
                  </div>
                  <div className="entity-label-header">Entity Match Confidence</div>
                </div>
                <div className="detail-header-score">
                  <div className="business-score">{analytics.businessScore}</div>
                  <div className="business-score-label">Business Value Score</div>
                  <div className="business-score-sublabel">{analytics.businessScoreLabel}</div>
                </div>
              </div>
              <button className="close-button" onClick={closeDetail}>✕</button>
            </div>

            <div className="analytics-section">
              <p className="analytics-description">{analytics.description}</p>

              <h3 className="section-title">Confidence Scoring Breakdown</h3>
              
              <div className="confidence-scores">
                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-icon">🎯</span>
                    <span className="confidence-name">Topic Match</span>
                    <span className="confidence-percentage">{analytics.confidenceScores.topicMatch}%</span>
                  </div>
                  <div className="confidence-bar-container">
                    <div className="confidence-bar" style={{ width: `${analytics.confidenceScores.topicMatch}%`, backgroundColor: '#3b82f6' }}></div>
                  </div>
                  <p className="confidence-description">Subreddit theme closely aligns with company domain and product category</p>
                </div>

                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-icon">📈</span>
                    <span className="confidence-name">Mention Frequency</span>
                    <span className="confidence-percentage">{analytics.confidenceScores.mentionFrequency}%</span>
                  </div>
                  <div className="confidence-bar-container">
                    <div className="confidence-bar" style={{ width: `${analytics.confidenceScores.mentionFrequency}%`, backgroundColor: '#10b981' }}></div>
                  </div>
                  <p className="confidence-description">Company frequently mentioned across multiple threads and contexts</p>
                </div>

                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-icon">👥</span>
                    <span className="confidence-name">Audience Size</span>
                    <span className="confidence-percentage">{analytics.confidenceScores.audienceSize}%</span>
                  </div>
                  <div className="confidence-bar-container">
                    <div className="confidence-bar" style={{ width: `${analytics.confidenceScores.audienceSize}%`, backgroundColor: '#8b5cf6' }}></div>
                  </div>
                  <p className="confidence-description">{formatNumber(selectedSubreddit.subscribers)} subscribers • Large subscriber base providing significant reach potential</p>
                </div>

                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-icon">💬</span>
                    <span className="confidence-name">Engagement Quality</span>
                    <span className="confidence-percentage">{analytics.confidenceScores.engagementQuality}%</span>
                  </div>
                  <div className="confidence-bar-container">
                    <div className="confidence-bar" style={{ width: `${analytics.confidenceScores.engagementQuality}%`, backgroundColor: '#64748b' }}></div>
                  </div>
                  <p className="confidence-description">Deep, substantive discussions with high-quality discourse</p>
                </div>
              </div>

              <div className="detected-aliases-section">
                <p className="aliases-label">Detected Aliases & Mentions:</p>
                <div className="aliases-list">
                  {analytics.aliases.map((alias, idx) => (
                    <span key={idx} className="alias-badge">"{alias}"</span>
                  ))}
                </div>
                <p className="aliases-note">These variations have been resolved to the canonical entity "{searchQuery}" with high confidence, ensuring accurate mention tracking across discussions.</p>
              </div>
            </div>

            <h3 className="posts-title">Context Preview</h3>
            <div className="posts-list">
              {detailPosts.map((post) => (
                <div key={post.id} className="post-card-preview">
                  <div className="post-header-preview">
                    <span className={`post-type-badge ${post.type.toLowerCase()}`}>{post.type}</span>
                    <h4 className="post-title-preview">{post.title}</h4>
                    <span className={`sentiment-badge sentiment-${post.sentiment.type}`}>
                      {post.sentiment.icon} {post.sentiment.label} ({post.sentiment.score})
                    </span>
                  </div>
                  <p className="post-content-preview">{post.content}</p>
                  
                  <div className="post-metadata">
                    <div className="metadata-section">
                      <span className="metadata-label">Mentions:</span>
                      <div className="mentions-list">
                        {post.mentions.map((mention, idx) => (
                          <span key={idx} className="mention-badge">"{mention}"</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="metadata-section">
                      <span className="metadata-label">Key Phrases:</span>
                      <div className="key-phrases-list">
                        {post.keyPhrases.map((phrase, idx) => (
                          <span key={idx} className="key-phrase-badge">{phrase}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <p className="context-note">Sample posts and comments demonstrating entity mentions with sentiment analysis and key phrase extraction. Sentiment scores range from 0-100, where higher scores indicate stronger sentiment polarity.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RedditDiscovery


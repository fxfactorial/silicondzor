import { observable } from 'mobx';

class SdMobx {
	@observable news_posts = [];
	@observable jobs_posts = [];
	@observable events = [];
	@observable bug_bounties = [];
}

let store = new SdMobx;
export default store;
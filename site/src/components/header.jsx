import { isZhCN } from '../utils/util';
import packageInfo from '../../../package.json';
import logo from '../assets/logo.svg';
import antDesignVue from '../assets/ant-design-vue.svg';
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
  props: {
    name: String,
    searchData: Array,
  },
  data() {
    return {
      value: null,
    };
  },
  mounted() {
    this.initDocSearch(this.$i18n.locale);
  },
  methods: {
    handleClose(key) {
      localStorage.removeItem('jobs-notification-key');
      localStorage.setItem('jobs-notification-key', key);
    },
    initDocSearch(locale) {
      window.docsearch({
        apiKey: '92003c1d1d07beef165b08446f4224a3',
        indexName: 'antdv',
        inputSelector: '#search-box input',
        algoliaOptions: { facetFilters: [isZhCN(locale) ? 'cn' : 'en'] },
        transformData(hits) {
          hits.forEach(hit => {
            hit.url = hit.url.replace('www.antdv.com', window.location.host);
            hit.url = hit.url.replace('https:', window.location.protocol);
          });
          return hits;
        },
        debug: false, // Set debug to true if you want to inspect the dropdown
      });
    },
    handleClick() {
      const name = this.name;
      const path = this.$route.path;
      const newName = isZhCN(name) ? name.replace(/-cn\/?$/, '') : `${name}-cn`;
      this.$router.push({
        path: path.replace(name, newName),
      });
      this.$i18n.locale = 'zh-CN';
    },
    onSelect(val) {
      this.$router.push(val);
      this.value = val;
    },
  },
  render() {
    const name = this.name;
    const isCN = true; //isZhCN(name);
    const path = this.$route.path;
    const selectedKeys = path === '/jobs/list-cn' ? ['jobs'] : ['components'];
    return (
      <header id="header">
        <a-row>
          <a-col class="header-left" xxxl={3} xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
            <router-link to={{ path: '/' }} id="logo">
              <img alt="logo" height="32" src={logo} />
              <img alt="logo" height="16" src={antDesignVue} />
            </router-link>
          </a-col>
          <a-col xxxl={20} xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
            <div id="search-box">
              <SearchOutlined />
              <a-input placeholder={'搜索组件...'} style="width: 200px" />
            </div>
            <span id="github-btn" class="github-btn">
              <a class="gh-btn" href="//github.com/vueComponent/ant-design-vue/" target="_blank">
                <span class="gh-ico" aria-hidden="true"></span>
                <span class="gh-text">Star</span>
              </a>
            </span>
            <a-button
              ghost
              size="small"
              onClick={this.handleClick}
              class="header-lang-button"
              key="lang-button"
            >
              {'中文'}
            </a-button>
            <a-select
              style="width: 100px"
              size="small"
              defaultValue={packageInfo.version}
              class="version"
            >
              <a-select-option value={packageInfo.version}>{packageInfo.version}</a-select-option>
              <a-select-option value="1.x" onClick={() => (location.href = 'https://1x.antdv.com')}>
                1.x
              </a-select-option>
            </a-select>
            <a-menu selectedKeys={selectedKeys} mode="horizontal" class="menu-site" id="nav">
              <a-menu-item key="components">
                <router-link to="/docs/vue/introduce">{'组件'}</router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </header>
    );
  },
};

export default class QueryFactoryStore {
  // 查询条件列表
  filters = [];
  // 跳过条数
  skip = 0;
  // 最大返回条数
  limit = 20;
  // 当前所在页
  page = 1;
  // 排序列表
  sorters = [];
  // 组合排序队列
  unionSortQueue = [];

  // 查询条件组合逻辑 & 交集 | 并集
  logicMode = '&';

  // 单键排序/组合排序 0 单键 1 组合
  sortMode = 0;

  get query () {
    return {
      [this.logicMode === '|' ? '$or' : '$and']: this.filters.map(v => v.filter)
    };
  }

  get sort () {
    if (this.sortMode === 0) {
      return Object.assign({}, ...this.sorters.map(v => v.sorter));
    } else {
      return Object.assign({}, ...this.unionSortQueue.map(v => v.sorter));
    }
  }

  _refresh = _ => null;

  get _defaultPageSize () {
    return parseInt(localStorage.getItem(`mg.pagination.defaultPageSize.${this._id}`)) || 20;
  }

  set _defaultPageSize (pageSize) {
    localStorage.setItem(`mg.pagination.defaultPageSize.${this._id}`, pageSize);
  }

  constructor ({
    filters = [],
    sorters = [],
    page = 1,
    pageSize,
    onRefreshData = _ => null,
    id = 'common'
  }) {
    this.filters = filters;
    let firstSorterHasMode;
    this.sorters = sorters.map(sorter => {
      sorter._onUpdateMode = mode => {
        if (this.sortMode === 0) {
          if (mode !== 'none') {
            sorters.forEach(osorter => {
              if (osorter.mode !== 'none' && osorter !== sorter) {
                osorter.updateMode('none');
              }
            });
          }
          this.refresh();
        } else {
          if (this.unionSortQueue.includes(sorter)) {
            this.unionSortQueue.splice(this.unionSortQueue.indexOf(sorter), 1);
          }
          if (mode !== 'none') {
            this.unionSortQueue.push(sorter);
          }
          this.unionSortQueue = [...this.unionSortQueue];
        }
      };
      if (!firstSorterHasMode && this.sortMode === 0 && sorter.mode !== 'none') {
        sorter._onUpdateMode(sorter.mode);
        firstSorterHasMode = sorter;
      }
      return sorter;
    });
    this._id = id;
    this.updatePageSize(pageSize || this._defaultPageSize);
    this.toPage(page);
    this._refresh = onRefreshData;
  }

  updateSortMode (sortMode) {
    if (![0, 1].includes(sortMode)) return;
    this.sortMode = sortMode;
    this.sorters.forEach(sorter => sorter.mode = 'none');
    this.unionSortQueue = [];
  }

  updateLogicMode (logicMode) {
    if (!['&', '|'].includes(logicMode)) return;
    this.logicMode = logicMode;
  }

  updatePageSize (pageSize) {
    if (pageSize <= 0) return;
    this.limit = pageSize;
    this._defaultPageSize = pageSize;
    this.page = Math.floor(this.skip / this.limit) + 1;
  };

  updatePage (page) {
    if (page <= 0) return;
    this.page = page;
    this.skip = (page - 1) * this.limit;
  }

  toPage (page) {
    this.updatePage(page);
    this._refresh();
  }

  toPrevPage () {
    this.toPage(this.page - 1);
  }

  toNextPage () {
    this.toPage(this.page + 1);
  }

  refresh () {
    this._refresh();
  }
}
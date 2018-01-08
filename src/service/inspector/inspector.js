import v1 from './../v1';

export async function fetchInspector({query = {}, limit = 20, skip, sort = {_id: -1}}) {
  return await v1({
    url: 'inspectionOrders',
    params: {
      query, limit, skip, sort,
      selector: 'inspectorDetail city price battery inspectedBikes finish offWork releasedTasks addedTasks finalInvalidTasks statisticsOfProject statistic fixedStatistic payment isEnableSelfOffWork times',
      populateSelector: {}
    }
  });
}

export async function fetchInspectorDetailById2 ({id}) {
  return await v1({
    url: `inspectionOrders/${id}`,
    params: {
      selector: 'inspectorDetail city price battery inspectedBikes finish offWork releasedTasks addedTasks finalInvalidTasks statisticsOfProject statistic fixedStatistic payment isEnableSelfOffWork times',
      populateSelector: {}
    }
  });
}

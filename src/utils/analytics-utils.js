import AnalyticsManager from '../analytics/events';

export const firePageView = () => {
  AnalyticsManager.fire('PageView', {
    dt: new Date()
  });
};

import Card from '../Card/Card';
import styles from './Graph.module.scss';

const Graph = ({dataPoints, labelClass, fillMeterClass, fillMeterFillClass, graphCardClass, maxValue}) => {
  const customGraphCardClass = graphCardClass
    ? `${styles['graph-container']} ` + graphCardClass
    : styles['graph-container'];
  const customLabelClass = labelClass ? `${styles['graph-label']} ` + labelClass : styles['graph-label'];
  const customGraphFillMeterClass = fillMeterClass
    ? `${styles['graph-fill-meter']} ` + fillMeterClass
    : styles['graph-fill-meter'];
  const customFillMeterFillClass = fillMeterFillClass
    ? `${styles['graph-fill-meter__fill']} ` + fillMeterFillClass
    : styles['graph-fill-meter__fill'];

  if (maxValue > 0) {
    dataPoints.forEach(data => {
      data.barFillHeight = Math.round((data.value / maxValue) * 100) + '%';
    });
  }

  return (
    <Card className={customGraphCardClass}>
      {dataPoints.map(({label, barFillHeight}) => {
        return (
          <div className={styles.graph} key={label}>
            <div className={customGraphFillMeterClass}>
              <div className={customFillMeterFillClass} style={{height: barFillHeight}}></div>
            </div>
            <label className={customLabelClass}>{label}</label>
          </div>
        );
      })}
    </Card>
  );
};

export default Graph;

import Card from '../Card/Card';
import './Graph.scss';

const Graph = ({dataPoints, labelClass, fillMeterClass, fillMeterFillClass, graphCardClass, maxValue}) => {
  const customGraphCardClass = graphCardClass ? 'graph-container ' + graphCardClass : 'graph-container';
  const customLabelClass = labelClass ? 'graph-label ' + labelClass : 'graph-label';
  const customGraphFillMeterClass = fillMeterClass ? 'graph-fill-meter ' + fillMeterClass : 'graph-fill-meter';
  const customFillMeterFillClass = fillMeterFillClass
    ? 'graph-fill-meter__fill ' + fillMeterFillClass
    : 'graph-fill-meter__fill';

  if (maxValue > 0) {
    dataPoints.forEach(data => {
      data.barFillHeight = Math.round((data.value / maxValue) * 100) + '%';
    });
  }

  return (
    <Card className={customGraphCardClass}>
      {dataPoints.map(({label, barFillHeight}) => {
        return (
          <div className="graph" key={label}>
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

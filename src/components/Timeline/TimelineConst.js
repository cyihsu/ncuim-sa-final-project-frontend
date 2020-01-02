
import { makeStyles } from '@material-ui/core/styles';

const dayChineseName = ['日', '一', '二', '三', '四', '五', '六'];
const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
}));

export {
  dayChineseName,
  useStyles,
};

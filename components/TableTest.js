import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, Edit } from "@material-ui/icons/";

const useStyles = makeStyles({
  table: {
    background: "#363636",
    borderRadius: "6px",
    // width: "80%",
    left: 0,
    right: 0,
    margin: "auto",
    position: "relative",
    top: "20px",
  },
  tableRow: {
    border: "none",
    background: "#363636",
  },
  tableCell: {
    color: "white",
    // borderTop: "1px solid grey",
    // borderBottom: "1px solid grey",
    border: "none",
  },
  body: {
    borderRadius: "10px",
    background: "#363636",
    // border: "black solid 1px",
  },
});

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const TableTest = ({ rows, deleteChannel }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableBody className={classes.body}>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              className={classes.tableRow}
              key={row.name}
            >
              <TableCell
                className={classes.tableCell}
                component="th"
                scope="row"
              >
                <Typography variant="h6">{row.name}</Typography>
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                {/* <Button variant="contained" color="primary">
                  Select
                </Button> */}
                <IconButton variant="contained" style={{ color: "white" }}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => deleteChannel(row)}
                  color="default"
                  style={{ color: "white" }}
                >
                  <Close />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTest;

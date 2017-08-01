/**
 * Created by nicholas on 7/18/17.
 */
import React from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { blue900 } from 'material-ui/styles/colors'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { openNavDrawer, openUserDrawer } from './../actions'
import Avatar from 'material-ui/Avatar'
import { currentUserSelector } from '../../users/selectors'

const styles = {
  toolbar: {
    backgroundColor: blue900,
  },
  createArticleButton: {
    fontFamily: "Roboto, sans-serif"
  },
  "createArticleButton:hover": {
    backgroundColor: "blue"
  },
  currentUserAvatar: {
    margin: "0 20px 0 25px"
  },
  masthead: {
    color: "White",
    fontFamily: "Old English Text MT",
    fontSize: "2em"
  },
  mastheadLink: {
    textDecoration: 'none',
  }
}

const Navbar = ({ classes,
                  openNavDrawer,
                  openUserDrawer,
                  currentUser }) => (
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup key={1}>
      <IconButton onClick={openNavDrawer}>
        <NavigationMenu color={"White"} />
      </IconButton>
      <Link
        to="/"
        className={classes.mastheadLink}
      >
        <div className={classes.masthead}>
          The Spectator
        </div>
      </Link>
    </ToolbarGroup>
    <ToolbarGroup key={2}>
      <Link to="/articles/new">
        <RaisedButton
          className={classes.createArticleButton}
          label="New Article"
        />
      </Link>
      <Avatar
        onClick={openUserDrawer}
        className={classes.currentUserAvatar}
        src={currentUser.thumbnail}
      />
    </ToolbarGroup>
  </Toolbar>
);

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
});

const mapDispatchToProps = dispatch => ({
  openNavDrawer: () => {
    dispatch(openNavDrawer())
  },
  openUserDrawer: () => {
    dispatch(openUserDrawer())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(Navbar))

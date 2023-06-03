import { connect } from "react-redux";
import { sendMessageCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}

// compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withAuthNavigate
// )(Dialogs)

// let AuthNavigateComponent = withAuthNavigate(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthNavigateComponent);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthNavigate
)(Dialogs);
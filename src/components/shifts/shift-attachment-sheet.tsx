import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { withTheme } from 'styled-components';
import { useActions } from '@root/hooks/useActions';
// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import AwesomeAlert from 'react-native-awesome-alerts';

const ShiftAttachmentSheet = () => {
    const [showalert, setShowAlert] = useState(false);
    const [cancelable, setCancelable] = useState(true);
    const [id, setId] = useState();
    const [btnText, setbtnText] = useState('Confirm');
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    const {
        shiftReportsEntriesAttachments,
        deleteShiftReportAttachmentLoading,
        shiftReportEntryID,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { deleteShiftReportAttacments, getShiftsReportsEntrieAttachments } =
        useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    return (
        <MainView>
            <FlatList
                style={{ marginBottom: 0 }}
                data={shiftReportsEntriesAttachments}
                renderItem={({ item, index }) => {
                    // @ts-ignore
                    return (
                        <CustomMainWrapper>
                            <ItemView>
                                <DeleteIcon>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            setbtnText('Confirm');
                                            setShowAlert(true);
                                            setCancelable(true);
                                            setId(item.documentID);
                                        }}>
                                        <DeleteImage
                                            source={require('@root/assets/minus/minus.png')}
                                        />
                                    </TouchableOpacity>
                                </DeleteIcon>

                                <FilesBackground>
                                    <SelectedImage
                                        source={{
                                            uri:
                                                item.fileDetail != null
                                                    ? 'data:image/png;base64,' +
                                                      item.fileDetail.file
                                                    : '',
                                        }}
                                    />

                                    <FilesText fontSize={fontSizeState}>
                                        Description
                                    </FilesText>

                                    <FilesTextDescription
                                        fontSize={fontSizeState}>
                                        {item.description}
                                    </FilesTextDescription>
                                </FilesBackground>
                            </ItemView>
                        </CustomMainWrapper>
                    );
                }}
            />

            <AwesomeAlert
                customView={
                    <PopUpView>
                        <Title fontSize={fontSizeState}>Alert</Title>
                        <SubTitle fontSize={fontSizeState}>
                            Are you sure to delete this?  
                        </SubTitle>
                        <BtnView>
                            <TouchableOpacity
                                onPress={async () => {
                                    setbtnText('Deleting...');
                                    setCancelable(false);

                                    await deleteShiftReportAttacments({
                                        id: id,
                                        orgID: orgID,
                                    });
                                    await getShiftsReportsEntrieAttachments({
                                        id: shiftReportEntryID,
                                        orgID: orgID,
                                    });
                                    setCancelable(false);
                                    setShowAlert(false);
                                }}>
                                    <BtnOK>
                                    <BtnText fontSize={fontSizeState}>
                                        {btnText}
                                    </BtnText>
                                </BtnOK>
                            </TouchableOpacity>
                            {cancelable && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowAlert(!showalert);
                                    }}>
                                    <BtnCancel>
                                        <BtnText fontSize={fontSizeState}>
                                            Cancel
                                        </BtnText>
                                    </BtnCancel>
                                </TouchableOpacity>
                            )}
                        </BtnView>
                    </PopUpView>
                }
                show={showalert}
                showProgress={false}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
            />
        </MainView>
    );
};

// @ts-ignore
export default withTheme(ShiftAttachmentSheet);

type FontSizeProps = {
    fontSize: number;
};

const BtnText = styled.Text<FontSizeProps>`
    color: white;
    text-align: center;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
`;

const BtnCancel = styled.View`
    width:92px;
    height:40px;
    background-color: ${({ theme }: any) => theme.colors.red}
        border-radius:5px;
        margin-left:10px;
        padding:8px 10px
`;

const BtnOK = styled.View`
    width:100px;
    height:40px;
    background-color: ${({ theme }: any) => theme.colors.greenColor}
        border-radius:5px;
        margin-right:10px;
        padding:8px 10px
`;

const BtnView = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
`;

const SubTitle = styled.Text<FontSizeProps>`
    text-align: center;
    margin-top: 5px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
`;
const Title = styled.Text<FontSizeProps>`
    text-align: center;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    color: ${({ theme }: any) => theme.colors.textGray};
`;

const PopUpView = styled.View`
    width: 320px;
`;

const FilesTextDescription = styled.Text<FontSizeProps>`
    margin-top: 5px;
    margin-left: 8px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const FilesText = styled.Text<FontSizeProps>`
    margin: 5px 0 0 8px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const SelectedImage = styled.Image`
    height: 145px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #000000;
`;

const FilesBackground = styled.View`
    margin: 16px;
    border-radius: 8px;
    background: ${({ theme }: any) => theme.colors.primary};
    padding: 24px 15px;
`;

const DeleteImage = styled.Image``;

const DeleteIcon = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    top: 30px;
    right: 30px;
`;

const ItemView = styled.View`
    position: relative;
`;

const CustomMainWrapper = styled.View`
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;

const MainView = styled.View``;

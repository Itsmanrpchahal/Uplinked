import React from 'react';
import {  FlatList, Text, TouchableOpacity } from 'react-native';
import { withTheme } from 'styled-components';
import { useActions } from '@root/hooks/useActions';
// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';

const ShiftAttacmentSheet = () => {
    const {
        shiftReportsEntriesAttachments,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { deleteShiftReportAttacments  } =
        useActions();

    return (
        <FlatList
            nestedScrollEnabled={false}
            data={shiftReportsEntriesAttachments}
            renderItem={({ item, index }) => {
                return (
                    <CustomMainWrapper>
                        <DeleteLoadingWrapper>
                            <DeleteLoadingText>Deleting...</DeleteLoadingText>
                        </DeleteLoadingWrapper>
                        <ItemView>
                            <DeleteIcon>
                                <TouchableOpacity
                                    onPress={async () => {
                                        await deleteShiftReportAttacments({
                                            id: item.documentID,
                                        });
                                    }}>
                                    <DeleteImage
                                        source={require('@root/assets/minus/minus.png')} />
                                </TouchableOpacity>


                            </DeleteIcon>
                                    
                            <FilesBackground>
                                <SelectedImage
                                    source={{
                                        uri:
                                        item.fileDetail !=
                                        null
                                            ? 'data:image/png;base64,' +
                                            item
                                                  .fileDetail
                                                  .file
                                            : '',
                                    }} />

                                <FilesText>Description</FilesText>
                                <FilesTextDescription>
                                    {item.description}
                                </FilesTextDescription>
                            </FilesBackground>

                        </ItemView>
                    </CustomMainWrapper>
                );
            }}>
        </FlatList>
    );
};

// @ts-ignore
export default withTheme(ShiftAttacmentSheet);

const DeleteLoadingWrapper = styled.View`
    position: absolute;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const DeleteLoadingText = styled.Text``;

const FilesTextDescription = styled.Text`
    margin: 5px 0 0px 8px;
    font-size: ${({ theme }: any) => theme.fontSize.cardText};
    color: ${({ theme }: any) => theme.colors.text};
`;

const FilesText = styled.Text`
    margin: 5px 0 0px 8px;
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
    color: ${({ theme }: any) => theme.colors.text};
`;

const SelectedImage = styled.Image`
  height: 145px;
  margin-bottom:10px;
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

const ItemView = styled.View``;

const CustomMainWrapper = styled.View`
    background-color: ${({ theme }: any) => theme.colors.secondary};
    position: relative;
`;

export enum ActionType {
    SHIFT_REPORT_INIT = 'shift_reports_init',
    SHIFT_REPORT_GET_SUCCESS = 'shift_reports_get_success',
    SHIFT_REPORT_GET_FAILED = 'shift_reports_get_failed',

    CREATE_PATROL_ENTRY_INIT = 'create_petrol_entry_init',
    CREATE_PATROL_ENTRY_SUCCESS = 'create_petrol_entry_success',
    CREATE_PATROL_ENTRY_FAILED = 'create_petrol_entry_failed',

    UPLOAD_ATTACHMENT_PATROL_ENTRY_INIT = 'upload_attachment_petrol_entry_init',
    UPLOAD_ATTACHMENT_PATROL_ENTRY_SUCCESS = 'upload_attachment_petrol_entry_success',
    UPLOAD_ATTACHMENT_PATROL_ENTRY_FAILED = 'upload_attachment_petrol_entry_failed',

    GET_ATTACHMENT_PATROL_ENTRY_INIT = 'get_attachment_petrol_entry_init',
    GET_ATTACHMENT_PATROL_ENTRY_SUCCESS = 'get_attachment_petrol_entry_success',
    GET_ATTACHMENT_PATROL_ENTRY_FAILED = 'get_attachment_petrol_entry_failed',

    DELETE_ATTACHMENT_PATROL_ENTRY_INIT = 'delete_attachment_petrol_entry_init',
    DELETE_ATTACHMENT_PATROL_ENTRY_SUCCESS = 'delete_attachment_petrol_entry_success',
    DELETE_ATTACHMENT_PATROL_ENTRY_FAILED = 'delete_attachment_petrol_entry_failed',

    END_SHIFT_INIT = 'end_shift_init',
    END_SHIFT_SUCCESS = 'end_shift_success',
    END_SHIFT_FAILED = 'end_shift_failed',

    START_SHIFT_INIT = 'start_shift_init',
    START_SHIFT_SUCCESS = 'start_shift_success',
    START_SHIFT_FAILED = 'start_shift_failed',

    SET_SHIFT_REPORT_ENTRY_ID = 'set_shift_report_entry_id',
}
